import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Sat } from '../models/sat';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class SatService {

  baseURL: string = "http://localhost:8080/"; //will need to be changed for hosting

  public satList: Sat[] = [];

  private static joelApiKey = 'NPFFJL-ZH53BK-5ECGZG-4U96';

  //TEMP
  //CHANGE THESE WITH USERS POSITION
  private latitude: string = '41.433';
  private longitude: string = '-91.054';

  private apiKey: string = SatService.joelApiKey;

  private getSatUrl: string =
    'https://api.n2yo.com/rest/v1/satellite/positions';

  constructor(private http: HttpClient, private router: Router ) {}

  getSatLocData(noradId: string): Observable<any> {
    console.log(noradId);
    this.latitude = sessionStorage.getItem("latitude") || '0';
    this.longitude = sessionStorage.getItem("longitude") || '0';
    return this.http.get(
      `/api/satellite/positions/${noradId}/${this.latitude}/${this.longitude}/0/1/&apiKey=${this.apiKey}`
    );
    }

  checkRoute() : string{
    console.log(this.router.url);
    return this.router.url;
  }


  getAllSat(): Observable<Sat[]> {
    return this.http.get<Sat[]>(
      this.baseURL + 'satellite');
  }

  getSatFavoritesByUser(userId: number): Observable<Sat[]> {
    return this.http.get<Sat[]>(
      this.baseURL + `satellites/userId/${userId}`);
  }

  getSatFavorites(): Observable<Sat[]> {
    console.log("Reaching backend");
    return this.http.get<Sat[]>(
      'http://localhost:8080/satellites/favorites'
      )
  }

  addSatellite(noradId:number, satname:string):Observable<any>{
    let body = {
      noradId:noradId,
      satName:satname,
      satPicture: "",
      numFavorites:0
    }
    return this.http.post<any>(`${this.baseURL}satellites`, body, {
      observe: 'response'
    }).pipe(
      catchError(this.handleError<any>('addSatellite', new HttpResponse({status:400})))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }

  checkSatellite(noradId:number):Observable<any>{
    return this.http.get<any>(`${this.baseURL}satellites/check/?noradId=${noradId}`, {
      observe:'response'
    }).pipe(
      catchError(this.handleError<any>('addSatellite', new HttpResponse({status:204})))
    );
  }
  getSatByName(satName:string):Observable<any>{
    return this.http.get<any>(`${this.baseURL}satellites/satName?satName=${satName}`);
  }
}
