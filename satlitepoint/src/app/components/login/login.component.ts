import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  displayReg = false;
  displayLog = false;
  displaySub = false;
  displayCan = false;
  displayLogBtn = true;
  displayRegBtn = true;
  badPassword = false;
  badUsername = false;
  badLogin = false;
  

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {

      
  }

  display(event:MouseEvent):void{
    let id = (<HTMLButtonElement>event.target).id;
    if(id==="register") {
      this.displayReg = true;
      this.displaySub = true;
      this.displayLog = false;
      this.displayLogBtn = false;
      this.displayCan = true;
      this.displayRegBtn = false;
    }
    else {
      this.displayLog = true;
      this.displayReg = false;
      this.displaySub = false;
      this.displayLogBtn = true;
      this.displayCan = false;
      this.displayRegBtn = true;

      if(id==="login") {
        const username = <HTMLInputElement>document.getElementById("username");
        const password = <HTMLInputElement>document.getElementById("password");
        this.isValidCred(username, password)
      }
      
    }
  }

  private isValidCred(username:HTMLInputElement, password:HTMLInputElement) {
    if(username && password) {
    let satpoint = <HTMLHeadingElement>document.getElementById("satpoint");
    if(username.checkValidity() && password.checkValidity()) {
      this.login(username.value, password.value);
      username.classList.remove("is-invalid");
      password.classList.remove("is-invalid");
    } 
    else {
  
    if(!username.checkValidity()) {
      username.classList.add("is-invalid");
      this.badUsername = true;
    }
    else{
      username.classList.remove("is-invalid");
      this.badUsername = false;
    }
  
    if(!password.checkValidity()){
      password.classList.add("is-invalid");
      this.badPassword = true;
    }else {
      password.classList.remove("is-invalid");
      this.badPassword = false;
    }
    satpoint.classList.remove("is-invalid");
  }

  }
}

  private login(username:string, password:string){
    let satpoint = <HTMLHeadingElement>document.getElementById("satpoint");

    this.loginService.login(username, password).subscribe(out => 
      {
        if(out == undefined){
          satpoint.classList.add("is-invalid")
          this.badLogin = true;
        }else {
          console.log(out)
          this.badLogin = false;
          sessionStorage.setItem("userId",out.body[0]);
          sessionStorage.setItem("username", out.body[1]);
          sessionStorage.setItem("latitude", out.body[2]);
          sessionStorage.setItem("longitude", out.body[3]);
          this.router.navigateByUrl("/homepage");
        }    
        
        
    });
  
  
  }




}
