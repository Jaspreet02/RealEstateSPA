import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../../shared/models/user';
import { ChangePasswordBindingModel } from '../../shared/models/changePasswordBindingModel';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class UserService {

  private userUrl = 'http://localhost:8004/api/User';  // URL to web api

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.userUrl = baseUrl}

  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    return result.join("&");
}

  getUsers(pageNumber: number, pageSize: number,sortField: string, sortOrder: string): Observable<PagedResponse<User>> {
   return this.http.get<PagedResponse<User>>(this.userUrl + 'api/User/' + pageNumber + '/' + pageSize + '/' + sortField + '/' + sortOrder);
   }

    /** POST: add a new user to the server */
    getUser (id: string): Observable<User> {
      return this.http.get<User>(this.userUrl + 'api/User/Get/' + id);
    }

  /** POST: add a new user to the server */
  addUser (user: User, role : string): Observable<User> {
    const url = `${this.userUrl}api/User/Post?roleName=` + role;
    return this.http.post<User>(url, user, httpOptions);
  }

  /** DELETE: delete the user from the server */
  deleteUser (user: User | string): Observable<User> {
    const id = typeof user === 'string' ? user : user.id;
    const url = `${this.userUrl}api/User/Delete/${id}`;
    return this.http.delete<User>(url, httpOptions);
  }

  /** PUT: update the user on the server */
  updateUser (user: User): Observable<any> {
    const url = `${this.userUrl}api/User/${user.id}`;
    return this.http.put(url, user, httpOptions);
  }

  /** POST: add a new user to the server */
  changePassword (entity: ChangePasswordBindingModel): Observable<any> {
    const url = `http://127.0.0.1:8001/api/Account/ChangePassword`;
    return this.http.post<ChangePasswordBindingModel>(url, entity, httpOptions);
  }

}

export interface PagedResponse<T> {
  count: number;
  result: T[];
}
