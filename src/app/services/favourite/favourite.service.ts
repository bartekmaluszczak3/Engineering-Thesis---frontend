import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeaders } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private baseUrl = "http://127.0.0.1:8080/favourite"

  constructor(private http: HttpClient) {}

  toggle(id: any){
    let headers = getHeaders()
    let url = this.baseUrl + "/toggle?id=" + id
    return this.http.post<any>(url, {headers})
  }

  get(){
    let headers = getHeaders()
    return this.http.get<any>(this.baseUrl + "/get", {headers})
  }

  check(id: any){
    let headers = getHeaders()
    let url = this.baseUrl + "/check?id=" + id
    return this.http.get<any>(url, {headers})
  }
}
