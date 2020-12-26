import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { State } from '../../shared/models/state';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class StateService {

  private Url = 'http://localhost:8004/api/State';  // URL to web api

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.Url = baseUrl; }

  getStates(pageNumber: number, pageSize: number,sortField: string, sortOrder: string): Observable<PagedResponse<State>> {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth':'True'});
    return this.http.get<PagedResponse<State>>(this.Url + 'api/State/' + pageNumber + '/' + pageSize + '/' + sortField + '/' + sortOrder,{headers : reqHeader});
  }

    /** POST: add a new user to the server */
    getState (id: string): Observable<State> {
      return this.http.get<State>(this.Url + 'api/State/' + id);
    }

  /** POST: add a new user to the server */
  addState (user: State): Observable<State> {
    const url = `${this.Url}api/State`;
    return this.http.post<State>(url, user, httpOptions);
  }

  /** DELETE: delete the user from the server */
  deleteState (user: State | string): Observable<State> {
    const id = typeof user === 'string' ? user : user.stateId;
    const url = `${this.Url}api/State/Delete/${id}`;

    return this.http.delete<State>(url, httpOptions);
  }

  /** PUT: update the user on the server */
  updateState (user: State): Observable<any> {
    const url = `${this.Url}api/State/Put/${user.stateId}`;
    return this.http.put(url, user, httpOptions);
  }
}

export interface PagedResponse<T> {
  count: number;
  result: T[];
}
