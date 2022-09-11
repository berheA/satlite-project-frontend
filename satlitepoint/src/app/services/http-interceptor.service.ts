import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(httpRequest.url.includes("https://api.n2yo.com")) return next.handle(httpRequest);
    //can update above to include api key
    return next.handle(httpRequest.clone({ withCredentials:true }));  }
}