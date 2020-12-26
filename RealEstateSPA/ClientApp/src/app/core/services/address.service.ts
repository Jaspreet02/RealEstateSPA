import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Address } from '../../shared/models/address';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class AddressService {

  private Url = 'http://localhost:8004/api/Address';  // URL to web api

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.Url = baseUrl}

  getAddresses(pageNumber: number, pageSize: number,sortField: string, sortOrder: string): Observable<PagedResponse<Address>> {
   // return of(Users);
   return this.http.get<PagedResponse<Address>>(this.Url + 'api/Address/' + pageNumber + '/' + pageSize + '/' + sortField + '/' + sortOrder);
  // return this.http.get<PagedResponse<Property>>(this.Url );
  }

    /** POST: add a new user to the server */
    getAddress (id: string): Observable<Address> {
      return this.http.get<Address>(this.Url + 'api/Address/' + id);
    }

  /** POST: add a new user to the server */
  addAddress (user: Address): Observable<Address> {
    const url = `${this.Url}`;
    return this.http.post<Address>(url, user, httpOptions);
  }

  /** DELETE: delete the user from the server */
  deleteAddress (user: Address | string): Observable<Address> {
    const id = typeof user === 'string' ? user : user.cityId;
    const url = `${this.Url}api/Address/Delete/${id}`;
    return this.http.delete<Address>(url, httpOptions);
  }

  /** PUT: update the user on the server */
  updateAddress (user: Address): Observable<any> {
    const url = `${this.Url}api/Address/Put/${user.cityId}`;
    return this.http.put(url, user, httpOptions);
  }
}

export interface PagedResponse<T> {
  count: number;
  result: T[];
}
