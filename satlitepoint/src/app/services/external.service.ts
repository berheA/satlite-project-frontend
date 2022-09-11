import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  constructor(private http:HttpClient) { }

  private url = "https://api.n2yo.com/rest/v1/satellite/above/"
  private api = "&apiKey=Y2PL87-RFVT42-46FW74-4U94"

  aboveMe(observer_alt=0, search_radius=1, category_id=0, observer_lat=0, observer_lng=0):Observable<any>{
    let latitude = sessionStorage.getItem("latitude") || '0';
    let longitude = sessionStorage.getItem("longitude") || '0';
    if(latitude) observer_lat = parseFloat(latitude);
    if(longitude) observer_lng = parseFloat(longitude);
      return this.http.get<any>(`/api/satellite/above/${observer_lat}/${observer_lng}/${observer_alt}/${search_radius}/${category_id}/${this.api}`);
  }


}
