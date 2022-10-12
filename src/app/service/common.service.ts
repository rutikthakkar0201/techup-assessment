import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constant';
import { CountryResponseModel } from '../model/data.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private readonly http: HttpClient) {}
  get(url: string): Observable<any> {
    return this.http.get<any>(Constants.baseUrl + url);
  }
}
