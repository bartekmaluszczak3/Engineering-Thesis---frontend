import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private baseUrl = "http://127.0.0.1:8080/announcement"
  constructor(private http: HttpClient) { }

  getHeaders(){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    return headers
  }

  getUrl(mapping: string, id: number, params:Map<string, string>){
    let url = this.baseUrl + mapping + "?id=" + id.toString() + "&"
    params.forEach((value: string, key:string) =>{
      url+=key + "=" + value + "&"
    })
    return url.substring(0, url.length - 1)
    
  }

  create(body: any){
    let headers = this.getHeaders()
    return this.http.post<any>(this.baseUrl + "/create", body, {headers})
  }

  edit(id: number, params:Map<string, string>){
    let headers = this.getHeaders()
    return this.http.put<any>(this.getUrl("/edit", id, params), {headers})
  }
  
  get(id: number, params:Map<string, string>){
    let headers = this.getHeaders()
    return this.http.get<any>(this.getUrl("/get", id, params), {headers})
  }

  getUser(){
    let headers = this.getHeaders()
    return this.http.get<any>(this.baseUrl + "/user", {headers})
  }
}
