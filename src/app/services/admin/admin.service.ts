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

  ban_user(login:any){
    let headers = getHeaders()
    let url = this.baseUrl + "/ban_user?login=" + login
    return this.http.put<any>(url, {headers})
  }

  get_info(){
    let headers = getHeaders()
    let url = this.baseUrl + "/get_info"
    return this.http.get<any>(url, {headers})
  }

  get_announcement(){
    let headers = getHeaders()
    let url = this.baseUrl + "/get_announcement"
    return this.http.get<any>(url, {headers})
  }
}
