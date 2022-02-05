import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeaders } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = "http://127.0.0.1:8080/admin"
  constructor(private http: HttpClient) { }

  get_users_info(){
    let headers = getHeaders()
    let url = this.baseUrl + "/get_users_info"
    return this.http.get<any>(url, {headers})
  }
}
