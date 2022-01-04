import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
