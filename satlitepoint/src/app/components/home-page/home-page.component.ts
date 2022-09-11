import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SidePanelService } from 'src/app/services/side-panel.service';
import { SideNavDirection } from '../side-nav-direction';
import { CommentService } from 'src/app/services/comment.service';
import { User } from 'src/app/models/user';
import { Sat } from 'src/app/models/sat';
import { Comment } from 'src/app/models/comment';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @Output() satname="";
  @Output() satid=0;
  @Output() satNoradId="";
  
  @Input() showPanel =false;
  tempSatid = "";
  right = SideNavDirection.Right;
  message='';
  term="";
  refresh = false;
  comments!:any[]
  page="mainPage";

  constructor(private loginService:LoginService, private panelService: SidePanelService, private commentService:CommentService) { }

  ngOnInit(): void {
  }

  showPanelMethod(info:any) {
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

  filter(event:string){
    console.log(event)
    this.term = event;
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