import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private url: String = 'http://localhost:8080/user/fav';

  constructor(private http: HttpClient) {}

  setFavorite(noradId: string) {
    let body = { noradId: noradId };
    console.log(`Setting ${noradId} as favorite`);

    this.http
      .post(`${this.url}/add`, body, {
        observe: 'response',
        withCredentials: true,
      })
      .subscribe();
  }

  removeFavorite(noradId: string) {
    console.log(`Removing ${noradId} as favorite`);
    let body = { noradId: noradId };

    this.http
      .post(`${this.url}/remove`, body, {
        observe: 'response',
        withCredentials: true,
      })
      .subscribe();
  }
}
