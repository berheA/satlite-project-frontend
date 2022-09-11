import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { Register } from 'src/app/models/register';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string = "";
  password:string = "";
  firstName:string = "";
  lastName:string = "";
  email:string = "";
  AboutMe:string = "";
  latitude:number = 0;
  longitude:number = 0;

  @Output() displayEvent = new EventEmitter<MouseEvent>(); //triggers the parent




  constructor(private userService: RegisterService) { }

  ngOnInit(): void {
  }

  // registerUser(){
  //   let user:Register = new Register(0, this.username, this.password, this.firstName, this.lastName, this.email);
  //   console.log(user);
  //   this.userService.register(user).subscribe(
  //     (response:Register)=>{
          
  //       }
  //     )
  // }


  
  registerUser(event:MouseEvent): void{
    if (this.username == "" || this.password == "" || this.firstName == "" || this.lastName == "" || this.email == "" || this.AboutMe == "" ){
      alert ("Please fill out all of the fields");
    }
    else {
      let emailHtml = <HTMLInputElement> document.getElementById("email");
      if(emailHtml.validity.patternMismatch) {
        alert("Please provide email in proper format")
      } else {
      let user:Register = new Register(0, this.username, this.password, this.firstName, this.lastName, this.email, this.AboutMe, this.latitude, this.longitude);
      console.log(user);
      this.userService.register(user).subscribe(
        // (response:Register)=>{
        (response)=>{
          if(response.status == 201) {
            this.display(event);
          }
          else {
            alert("Failed to register");
          }
          
        }
      )}
    }
  }


  display(event:MouseEvent):void{

    //if submit button was clicked, do logic in register.ts then emit event to goback to the logon
    //else if cancle button go back to logon
    this.displayEvent.emit(event); 
  }

}
