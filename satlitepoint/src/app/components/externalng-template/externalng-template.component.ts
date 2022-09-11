import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SideNavDirection } from '../side-nav-direction';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-externalng-template',
  templateUrl: './externalng-template.component.html',
  styleUrls: ['./externalng-template.component.css']
})
export class ExternalngTemplateComponent implements OnInit {
@Input() showPanel =false;
right = SideNavDirection.Right;


  constructor() { }


  ngOnInit(): void {
  }

  closeEvent(event:boolean){
    this.showPanel = false;
    
  }

}
