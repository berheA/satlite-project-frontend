import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExternalService } from 'src/app/services/external.service';
import { SatService } from 'src/app/services/sat.service';

@Component({
  selector: 'app-external-panel',
  templateUrl: './external-panel.component.html',
  styleUrls: ['./external-panel.component.css']
})
export class ExternalPanelComponent implements OnInit {

  page="add"
  term=""
  external: any[] = [];
  constructor(private service:ExternalService, private satService:SatService) {

  }

  ngOnInit(): void {
  }
  
  filter(event:string){
    this.term = event;
  }

  submit(){
    let radius = (<HTMLInputElement>document.getElementById("radius"));
    let altitude = (<HTMLInputElement>document.getElementById("altitude"));
    let category = (<HTMLSelectElement>document.getElementById("category"));

    let body = {
      altitude:parseFloat(altitude.value) | 0,
      radius:parseInt(radius.value) | 0,
      category:parseInt(category.value)  
    }
    
    let isBadInput = false;


    if(!altitude.checkValidity()) {
      body.altitude = 0;
      altitude.classList.add("is-invalid")
      isBadInput = true;
    } else {
      altitude.classList.remove("is-invalid")
    }
    if(!radius.checkValidity()) {
      body.radius = 0;
      radius.classList.add("is-invalid")
      isBadInput = true;
    } else {
      radius.classList.remove("is-invalid")
    }
    if(body.category < 0 || body.category > 54){
      body.category = 0;
    }

    if(!isBadInput){
    this.external = [];
    this.service.aboveMe(body.altitude, body.radius, body.category).subscribe(res => {
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
    
  }

}
