import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class MasterService {

  private MasterUrl = 'http://127.0.0.1:8004/api/Master';  // URL to web api

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.MasterUrl = baseUrl; }

  getTypes(): Observable<any> {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth':'True'});    
    return this.http.get<any>(this.MasterUrl + 'api/Master/Types', {headers : reqHeader});
  }

  getEmailTokens(): Observable<any> {
    // return of(Users);
    return this.http.get<any>(this.MasterUrl + 'api/Master/EmailToken');
  }

  getRunNumerStatus(): Observable<any> {
    // return of(Users);
    return this.http.get<any>(this.MasterUrl + 'api/Master/RunNumberStatus');
  }

}
