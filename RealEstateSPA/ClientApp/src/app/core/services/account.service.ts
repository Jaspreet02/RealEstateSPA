import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ChangePasswordBindingModel } from '../../shared/models/changePasswordBindingModel';
import { User } from '../../shared/models/user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'  })
};

@Injectable()

export class AccountService {

  private userUrl = 'http://localhost:8004/Account';  // URL to web api

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {this.userUrl = baseUrl}

  userAuthentication(userName: string, password: string):Observable<any>  {
    var data = {"Username" : userName, "Password" : password};
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth':'True'});
    return this.http.post( this.userUrl + 'Account/Login', data, { headers: reqHeader});
  }

  userRegistration(user : User): Observable<any> {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.http.post(this.userUrl + 'Account/Register/Tenant', user, { headers: reqHeader });
  }

  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}

  /** POST: add a new user to the server */
  changePassword (entity: ChangePasswordBindingModel): Observable<any> {
    const url = `http://127.0.0.1:8004/Account/ChangePassword`;
    return this.http.post<ChangePasswordBindingModel>(url, entity, httpOptions);
  }

}

export interface PagedResponse<T> {
  Count: number;
  Result: T[];
}
