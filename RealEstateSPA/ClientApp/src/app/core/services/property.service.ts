import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Property } from '../../shared/models/property';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class PropertyService {

  private Url = 'http://localhost:8004/api/Property';  // URL to web api

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.Url = baseUrl; }

  getProperties(typeId: number, cityId: number, intersection: string, prize: number[], pageNumber: number, pageSize: number, sortField: string, sortOrder: string): Observable<PagedResponse<Property>> {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth':'True'});
    return this.http.get<PagedResponse<Property>>(this.Url + 'api/Property/GetAllWithImages/' + typeId + '/' + cityId + '/' + intersection + '/' + pageNumber + '/' + pageSize + '/' + sortField + '/' + sortOrder + '?rent=' + prize[0] * 50 + '&rent=' + prize[1] * 50, { headers: reqHeader});
  }

  /** POST: add a new user to the server */
  getProperty(id: string): Observable<Property> {
    return this.http.get<Property>(this.Url + 'api/Property/GetWithAddress/' + id);
  }

  /** POST: add a new user to the server */
  addProperty(user: Property): Observable<Property> {
    const url = `${this.Url}api/Property`;
    return this.http.post<Property>(url, user, httpOptions);
  }

  /** DELETE: delete the user from the server */
  deleteProperty(user: Property | string): Observable<Property> {
    const id = typeof user === 'string' ? user : user.propertyId;
    const url = `${this.Url}api/Property/Delete/${id}`;

    return this.http.delete<Property>(url, httpOptions);
  }

  /** PUT: update the user on the server */
  updateProperty(user: Property): Observable<any> {
    const url = `${this.Url}api/Property/${user.propertyId}`;
    return this.http.put(url, user,httpOptions);
  }
}

export interface PagedResponse<T> {
  count: number;
  result: T[];
}
