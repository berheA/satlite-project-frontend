import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidePanelService {
  private showPanel = false;
  constructor() { }
  getShowPanel(){

    return this.showPanel;

  }

  setShowPanel(showHide: boolean) {
    this.showPanel = showHide;
  }

  togglePanelState() {
    this.showPanel = !this.showPanel;
    // return this.showNav;

  }

  isPanelOpen() {
    this.showPanel = true;

  }
}
