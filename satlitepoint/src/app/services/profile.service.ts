import { Injectable } from '@angular/core';
import { Update } from '../models/profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url:string ="http://localhost:8080/edit";

  constructor(private http:HttpClient) { }


  update(thisuser:Update){
    return this.http.post(this.url, thisuser).subscribe( res => {
      if(res) {
        let latitude = thisuser.latitude;
        let longitude = thisuser.longitude;
        if(latitude) sessionStorage.setItem("latitude", latitude.toString());
        if(longitude) sessionStorage.setItem("longitude", longitude.toString());
      }
    });
  }
}
