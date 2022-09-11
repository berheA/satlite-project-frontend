import { Component, Input, OnInit, ChangeDetectorRef, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { SidePanelService } from 'src/app/services/side-panel.service';
import { SideNavDirection } from '../side-nav-direction'; 

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<boolean>();

  

  @Input() showSidePanel =false;

  @Input() sidenavTemplateRef: any;
  @Input() duration: number = .8;
  @Input() navWidth: number = window.innerWidth;
  @Input() direction: SideNavDirection = SideNavDirection.Right;

  
  constructor(private panelService: SidePanelService, private changeDetector:ChangeDetectorRef) {

  }

  ngOnInit(): void {
  }
  
  onSidebarClose() {
    this.closeEvent.emit(false);
  }

  getSideNavBarStyle(showPanel: boolean) {
    let panelStyle: any = {};
    panelStyle.transition = this.direction + ' ' + this.duration + 's, visibility ' + this.duration + 's';
    panelStyle.width = this.navWidth + 'px';
    panelStyle[this.direction] = (showPanel ? 0 : (this.navWidth * -1)) + 'px';
    
    return panelStyle;
  }

  

 
}
