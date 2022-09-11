import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-cards',
  templateUrl: './comment-cards.component.html',
  styleUrls: ['./comment-cards.component.css']
})
export class CommentCardsComponent implements OnInit {
  @Input() comments!:any[];
  @Input() satid=0;
  @Input() satNoradId="";
  @Input() username: string | undefined;
  @Input() onUserProfile = false;
  @Input() refresh = false;
 
  userId: string | undefined;

  @Output() deleteEvent = new EventEmitter<boolean>();


  constructor(private commentService:CommentService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username") || undefined;
    this.userId = sessionStorage.getItem("userId") || undefined;
    // console.log(this.satNoradId)
    // console.log("in comment cards")
    // if(this.satNoradId) this.commentService.getComments(this.satNoradId).subscribe(res =>{
    //   console.log(res)
    //   if(res) this.comments = res.reverse();
    //   else this.comments=[];
    // });
}


  
  // getComments(){
  //   console.log("in comment cards");
  //   console.log(this.satNoradId);
  //   if(this.satNoradId) this.commentService.getComments(this.satNoradId).subscribe(res =>{
  //     console.log(res);
  //     this.comments = res;
  //   });
  
        
    // if(this.username) return this.commentService.getUserComments(this.username);
    // // this.comments = this.commentService.getComments(this.satid);
//     return this.comments;
  
// }

  delete(event:MouseEvent){
      //console.log((<HTMLButtonElement>event.target).id)

      this.commentService.deleteComment((<HTMLButtonElement>event.target).id).subscribe(res => {
        this.deleteEvent.emit(true);
      })
  }
}
