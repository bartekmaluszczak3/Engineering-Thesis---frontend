import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private baseUrl = "http://127.0.0.1:8080/announcement"
  constructor(private http: HttpClient) { }

  getHeaders(){
    let auth_token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    }
    return headers
  }

  create(body: any){
    return this.http.post<any>(this.baseUrl + "/create", body, {headers: this.getHeaders()})
  }
}
