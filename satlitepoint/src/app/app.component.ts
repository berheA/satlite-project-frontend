import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from './_animations/routerAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimation]
})
export class AppComponent {
  title = 'project-2-satpoint';

  prepareOutlet(outlet:RouterOutlet){
    if(outlet.isActivated) return outlet.activatedRoute.data; //gets the current route, it contains the state that will trigger an animation
    else return null;
  }
}
