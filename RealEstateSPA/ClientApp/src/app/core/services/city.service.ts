import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { City } from '../../shared/models/city';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class CityService {

  private Url = 'http://localhost:8004/api/City';  // URL to web api

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.Url = baseUrl; }

  getCities(pageNumber: number, pageSize: number,sortField: string, sortOrder: string): Observable<PagedResponse<City>> {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth':'True'});
    return this.http.get<PagedResponse<City>>(this.Url + 'api/City/' + pageNumber + '/' + pageSize + '/' + sortField + '/' + sortOrder, {headers : reqHeader});
  // return this.http.get<PagedResponse<Property>>(this.Url );
  }

    /** POST: add a new user to the server */
    getCity (id: string): Observable<City> {
      return this.http.get<City>(this.Url + 'api/City/' + id);
    }

  /** POST: add a new user to the server */
  addCity (user: City): Observable<City> {
    const url = `${this.Url}`;
    return this.http.post<City>(url, user, httpOptions);
  }

  /** DELETE: delete the user from the server */
  deleteCity (user: City | string): Observable<City> {
    const id = typeof user === 'string' ? user : user.cityId;
    const url = `${this.Url}api/City/Delete/${id}`;

    return this.http.delete<City>(url, httpOptions);
  }

  /** PUT: update the user on the server */
  updateUser (user: City): Observable<any> {
    const url = `${this.Url}api/City/Put/${user.cityId}`;
    return this.http.put('http://localhost:44352/landlord/property/2', user, httpOptions);
  }
}

export interface PagedResponse<T> {
  count: number;
  result: T[];
}
