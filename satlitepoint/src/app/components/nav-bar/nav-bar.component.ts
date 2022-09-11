import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router} from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router ) {}

  ngOnInit(): void {
  }

  onLogout() {
    this.loginService.logout();

    this.router.navigate(['/login'])
  }

}
