import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { SatService } from 'src/app/services/sat.service';
import { SidePanelService } from 'src/app/services/side-panel.service';


@Component({
  selector: 'app-sat-info',
  templateUrl: './sat-info.component.html',
  styleUrls: ['./sat-info.component.css'],
})

export class SatInfoComponent implements OnInit {
  @Input() satname: string = '';
  @Input() satId: number = 0;
  @Input() noradId: string = '';
  @Input() satPicture: string = '';
  @Input() numFavorites: number = 0;

  @Input() latitude: string = '';
  @Input() longitude: string = '';
  @Input() altitude: string = '';

  @Input() azimuth: string = '';
  @Input() elevation: string = '';

  @Input() rightAccention: string = '';
  @Input() declination: string = '';

  @Input() timestamp: string = '';
  @Input() isFavorite: boolean = false;

  @Input() page = '';
  @Input() index = 0;
  disabled = false;

  @Input() showButton = true;

  @Output() togglePanelStateEvent = new EventEmitter<any>();
  @Output() addSatelliteEvent = new EventEmitter<number>();

  constructor(
    private panelService: SidePanelService,
    private satService: SatService,
    private favService: FavoriteService
  ) {}

  ngOnInit(): void {
    console.log(this.noradId);
  }

  getTimestampMillis(): number {
    return Number(this.timestamp) * 1000;
    
  }

  isProfilePage():boolean {
   return this.satService.checkRoute() == '/profile';
  }

  refreshData(): void {
    
    this.satService.getSatLocData(this.noradId).subscribe({
      next: (data: any) => {
        let positions: any = data.positions[0];
        this.latitude = positions.satlatitude;
        this.longitude = positions.satlongitude;
        this.altitude = positions.sataltitude;
        this.azimuth = positions.azimuth;
        this.elevation = positions.elevation;
        this.rightAccention = positions.ra;
        this.declination = positions.dec;
        this.timestamp = positions.timestamp;
      },
    });
  }

  favorite(): void{
    if(this.isFavorite){
      this.favService.removeFavorite(this.noradId);
      this.isFavorite = false;
    }else{
      this.favService.setFavorite(this.noradId);
      this.isFavorite = true;
    }
  }

  toggleSidePanelEvent() {
    //this.panelService.togglePanelState();
    this.panelService.setShowPanel(true);
    console.log(this.satId)
    console.log(this.satname)


    this.togglePanelStateEvent.emit({
      showPanel: this.panelService.getShowPanel(),
      name: this.satname,
      id: this.satId,
      satNoradId: this.noradId
    });
  }

  addSat(event:MouseEvent){
    let btn = <HTMLButtonElement>event.target;
    this.disabled = true;
    this.addSatelliteEvent.emit(parseInt(btn.id));
  }

}
