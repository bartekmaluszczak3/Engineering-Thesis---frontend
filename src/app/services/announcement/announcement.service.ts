import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getHeaders } from '../../shared/utils';
@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private baseUrl = "http://127.0.0.1:8080/announcement"
  constructor(private http: HttpClient) { }


  getUrl(mapping: string, params:Map<String, String>){
    let url = this.baseUrl + mapping + "?"
    params.forEach((value: String, key:String) =>{
      url+=key + "=" + value + "&"
    })
    return url.substring(0, url.length - 1)
    
  }

  delete(id:any){
    let headers = getHeaders()
    let url = this.baseUrl + "/delete?id=" + id
    return this.http.delete<any>(url, {headers})
  }
  create(body: any){
    let headers = getHeaders()
    return this.http.post<any>(this.baseUrl + "/create", body, {headers})
  }

  edit(id:any, announcementDto: any){
    let headers = getHeaders()
    let url = this.baseUrl + "/edit?id="+id
    return this.http.put<any>(url, announcementDto, {headers})
  }
  
  get(url: any){
    let headers = getHeaders()
    var re = /search/gi
    let newUrl = this.baseUrl + url.replace(re, 'get')
    console.log(newUrl)
    return this.http.get<any>(newUrl, {headers})
  }

  getUser(){
    let headers = getHeaders()
    return this.http.get<any>(this.baseUrl + "/user", {headers})
  }

  getById(id: any){
    let headers = getHeaders()
    let url = this.baseUrl + "/get_by_id?id="+id
    return this.http.get<any>(url, {headers})
  }

  checkOwner(id: any): Observable<boolean>{
    let headers = getHeaders()
    let url = this.baseUrl + "/check_ownership?id="+id
    return this.http.get<any>(url, {headers})
  }

  increaseView(id: any){
    let headers = getHeaders()
    let url = this.baseUrl + "/add_viewed?id="+id
    return this.http.put<any>(url, {headers})
  }

  search(params: Map<String, String>){
    let headers = getHeaders()
    let url = this.getUrl("/get", params)
    return this.http.get<any>(url, {headers})
  }

}
