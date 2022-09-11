import { Component, Output, OnInit, Input, EventEmitter } from '@angular/core';
import { Sat } from 'src/app/models/sat';
import { ExternalService } from 'src/app/services/external.service';
import { SatService } from 'src/app/services/sat.service';
import { SidePanelService } from 'src/app/services/side-panel.service';

@Component({
  selector: 'app-sat-list',
  templateUrl: './sat-list.component.html',
  styleUrls: ['./sat-list.component.css'],
})
export class SatListComponent implements OnInit {
  @Output() showPanelMethodEvent = new EventEmitter<string>();
  @Input() page = '';
  @Input() term = '';

  baseURL: string = 'http://localhost:8080/';

  @Input() external: any[] = [];
  public globalSatList: Sat[] = [];
  public userSatList: Sat[] = [];
  //filler data for testing will get overwritten
  public satList: Sat[] = [
    {
      satName: 'INTERNATIONAL SPACE STATION',
      satId: 3,
      noradId: '25544',
      satPicture: 'https://www.nasa.gov/sites/default/files/s132e012209_sm.jpg',
      numFavorites: 10,
      favorite: true,
    },
    {
      satName: 'SES 1',
      satId: 1,
      noradId: '36516',
      satPicture: '',
      numFavorites: 3,
      favorite: true,
    },
    {
      satName: 'NOAA 19',
      satId: 4,
      noradId: '33591',
      satPicture: '',
      numFavorites: 5,
      favorite: false
    },
  ];

  responseStatus: number = 0;
  showExternal = false;

  constructor(
    private satService: SatService,
    private panelService: SidePanelService, 
    private externalService:ExternalService
  ) {}

  ngOnInit(): void {
    // let id id = parseInt(localStorage.getItem('userId'));
    // id = parseInt(id);
    // console.log(id);
    if(this.satService.checkRoute() === '/homepage')
    {
      console.log("Getting global favorites");
      this.getSatListByFavorites();
    }
    else if(this.satService.checkRoute() === "/profile")
    {
      let id = sessionStorage.getItem("userId");
      if (id) {
        this.getSatListByUserFavorites(parseInt(id));
        this.satList = this.userSatList;
        console.log('Getting user favorites');
      } else {
        console.log('Error getting user favorites');
      }
    }else if(this.satService.checkRoute() === "/add") {
      this.showExternal = true
      this.getExternalSatellites();
    }
    console.log("None");
    console.log(this.page);
  }

  getExternalSatellites(){
      this.externalService.aboveMe().subscribe(res => {
        if(res) {
          res.above.filter((s: { satid: number; }) => {
            this.satService.checkSatellite(s.satid).subscribe(res => {
              if(res.status != 200) {
                this.external.push(s);
              }
            })
          })
        }
      })
  }

  addSatellite(event:number){
    console.log(this.external[event]);
    this.satService.addSatellite(this.external[event].satid, this.external[event].satname).subscribe(
      res => {
        console.log(res);
      }
    )
  }


  filterSatList() {
      if (this.satService.checkRoute() === '/homepage') {
        return this.globalSatList.filter((sat) => {
          if (
            sat.satName.toLowerCase().includes(this.term) ||
            sat.noradId.toString().includes(this.term)
          ) {
            return sat;
          }
          return;
        });
      } else if(this.satService.checkRoute() === '/profile'){
        return this.userSatList.filter((sat) => {
          if (
            sat.satName.toLowerCase().includes(this.term) ||
            sat.satId.toString().includes(this.term)
          ) {
            return sat;
          }
          return;
        });
      } else if(this.satService.checkRoute() === '/add') {
        return this.external.filter(sat=> {
          if (
            sat.satname.toLowerCase().includes(this.term) ||
            sat.satid.toString().includes(this.term)
          ) {
            return sat;
          }
          return;
        })
      }
    
    if (this.page == 'mainPage') return this.globalSatList;
    else return this.userSatList;
  }

  getSatListByFavorites() {
    this.satService.getSatFavorites().subscribe((response: Sat[]) => {
      this.globalSatList = response;
      this.satList = this.globalSatList;
      console.log("Sat list");
      console.log(this.satList);
    });
  }

  getSatListByUserFavorites(id: number) {
    console.log(id);
    console.log('in get sat list by user');
    this.satService.getSatFavoritesByUser(id).subscribe(
      (response: Sat[]) => {
        this.userSatList = response;
        console.log(response);
      },
      (err) => {
        console.log('Error caught at Subscriber :' + err);
      },
      () => console.log('Processing Complete')
    );
  }

  public trackItem(index: number, item: Sat) {
    return item.satId;
  }

  togglePanelStateEvent(info: string) {
    this.showPanelMethodEvent.emit(info);
  }
}
