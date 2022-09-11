import { Component, OnInit} from '@angular/core';
import { Update } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SatService } from 'src/app/services/sat.service';
import { profileAnimation } from 'src/app/_animations/profileAnimation';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [profileAnimation]
})
export class ProfileComponent implements OnInit {
  aboutMe : String | undefined;
  firstName : String | undefined;
  lastName : String | undefined;
  email: String | undefined;
  latitude: Number | undefined;
  longitude: Number | undefined;
  
  username: string | undefined;
  showFav = false;
  showCom = false;
  satid = ""
  page = ""
  comments!:any[]

  constructor(private loginService:LoginService, private profileService:ProfileService, private commentService:CommentService) { }


  ngOnInit(): void {
    if(!this.loginService.currentUser){
    this.loginService.getUser(sessionStorage.getItem("username")).subscribe(user => {
        this.loginService.currentUser = user;  
        this.aboutMe = user.aboutMe;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.latitude = user.latitude;
        this.longitude = user.longitude;
        this.username = user.username || "";
        console.log(this.loginService.currentUser)
  })
}
  }

  showFavorites(){
    console.log(this.showFav)
      this.showFav = !this.showFav;
      this.page = "userFavorites"
  }
  showComments(){
    console.log('page in profile')
    console.log(this.page)
    this.showCom = !this.showCom;
    console.log(this.showCom)
    let username = sessionStorage.getItem("username");
    if(username) {
      this.commentService.getUserComments(username).subscribe(response => {
        console.log(response)
       this.comments = response.reverse();
      });
    }
  }

  updateUser(): void{
    let user:any = {"firstName":this.firstName, "lastName":this.lastName, "email":this.email, "aboutMe": this.aboutMe, "latitude":this.latitude, "longitude":this.longitude};
    console.log(user);
    this.profileService.update(user);
  } 


  delete(event:boolean){
    if(this.username) {
    this.commentService.getUserComments(this.username).subscribe( out => {
        if(out) this.comments = out.reverse();
        else this.comments = out;
    })
  }
  }
}
