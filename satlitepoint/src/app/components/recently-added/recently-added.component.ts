import { Component, OnInit, Output, Input} from '@angular/core';
import { Sat } from 'src/app/models/sat';
import { SatService } from 'src/app/services/sat.service';
import { CommentService } from 'src/app/services/comment.service';
import { SideNavDirection } from '../side-nav-direction';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {
  getNewSat = '';
  sat = new Sat(0,'','','',0,false)
  searching=false;
  comments!:any[]
  @Output() satname="";
  @Output() satid=0;
  @Output() satNoradId="";
  @Input() showPanel =false;
  tempSatid = "";
  right = SideNavDirection.Right;
  message='';






  constructor(private service:SatService, private commentService:CommentService) { }

  ngOnInit(): void {
  }


  find(){
    let inputGetNewSat = (<HTMLInputElement>document.getElementById("getNewSat"));
    this.getNewSat = inputGetNewSat.value;

    let getNewSatbyNorad = parseInt(this.getNewSat)

    if(getNewSatbyNorad) {
      this.service.checkSatellite(getNewSatbyNorad).subscribe(res => {
        if(res.body) {
          this.sat.favorite = res.body.favorite;
          this.sat.noradId = res.body.noradId;
          this.sat.numFavorites = res.body.numFavorites;
          this.sat.satName = res.body.satName;
          this.sat.satPicture = res.body.satPicture;
          this.sat.satId = res.body.satId;
          this.searching = true

        }
      })
    } else {
      this.service.getSatByName(this.getNewSat.toUpperCase()).subscribe(res => {
        if(res) {
          this.sat.favorite = res.favorite;
          this.sat.noradId = res.noradId;
          this.sat.numFavorites = res.numFavorites;
          this.sat.satName = res.satName;
          this.sat.satPicture = res.satPicture;
          this.sat.satId = res.satId;
          this.searching = true
        }
      })
    }
  }

  reset(){
    this.searching = false;
    let inputGetNewSat = (<HTMLInputElement>document.getElementById("getNewSat"));
    inputGetNewSat.value = '';
  }

  showPanelMethod(info:any) {
    console.log(info)
    this.commentService.getComments(info.satNoradId).subscribe(res => {
        if(res){
          this.comments = res.reverse();
        } else {
          this.comments=[];
        }
          console.log("in homepage")
          console.log(info)
          this.satname = info.name;
          this.satid = info.id;
          this.satNoradId = info.satNoradId;
          this.showPanel = info.showPanel;
          if(this.tempSatid != this.satNoradId) {
            this.clear();
          }
            this.tempSatid = this.satNoradId;
    })  
  }

  closeEvent(event:boolean){
    this.showPanel = false;
    
  }
  
  submit(){
    console.log("in homepage submit()")
    if(this.message){
      console.log(this.satNoradId)
      console.log(sessionStorage.getItem("userId"))
      let id = sessionStorage.getItem("userId");
      if(id) {
        this.commentService.sendComment(id, this.satNoradId, this.message, new Date(Date.now()).toLocaleString()).subscribe( 
          out => {
          this.comments = out.reverse();
      }
    )}
    }
    this.clear();
  }

  cancel(){
    this.clear();
    this.closeEvent(false);
  }

  clear(){
    this.message="";
  }

  delete(event:boolean){
    this.commentService.getComments(this.satNoradId).subscribe( out => {
      if(out) this.comments = out.reverse();
      else this.comments = [];      
      
    })
  }
}
