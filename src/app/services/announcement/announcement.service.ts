import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeaders } from '../../shared/utils';
@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private baseUrl = "http://127.0.0.1:8080/announcement"
  constructor(private http: HttpClient) { }


  getUrl(mapping: string, params:Map<string, string>){
    let url = this.baseUrl + mapping
    params.forEach((value: string, key:string) =>{
      url+=key + "=" + value + "&"
    })
    return url.substring(0, url.length - 1)
    
  }

  create(body: any){
    let headers = getHeaders()
    return this.http.post<any>(this.baseUrl + "/create", body, {headers})
  }

  edit(params:Map<string, string>){
    let headers = getHeaders()
    return this.http.put<any>(this.getUrl("/edit", params), {headers})
  }
  
  get(params:Map<string, string>){
    let headers = getHeaders()
    return this.http.get<any>(this.getUrl("/get", params), {headers})
  }

  getUser(){
    let headers = getHeaders()
    return this.http.get<any>(this.baseUrl + "/user", {headers})
  }

}
