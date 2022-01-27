import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeaders } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://127.0.0.1:8080/auth"
  constructor(private http: HttpClient) {}

  registerUser(user: any){
    return this.http.post<any>(this.baseUrl + "/register", user)
  }

  loginUser(user: any){
    return this.http.post<any>(this.baseUrl + "/login", user)
  }

  loggenIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  update(phone:any, city: any){
    let headers = getHeaders()
    let url = this.baseUrl + "/update?phone=" + phone + "&city=" + city;
    return this.http.post<any>(url, {headers})
  }

  getPhone(login:any){
    let headers = getHeaders()
    let url = this.baseUrl + "/get_phone?userLogin=" + login
    return this.http.get<any>(url, {headers})
  }

  getCity(){
    let headers = getHeaders()
    return this.http.get<any>(this.baseUrl + "/get_city", {headers})
  }
}
