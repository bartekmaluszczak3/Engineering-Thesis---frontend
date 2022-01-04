import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeaders } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private baseUrl = "http://127.0.0.1:8080/history";
  constructor(private http: HttpClient) { }

  get(){
    let headers = getHeaders()
    return this.http.get<any>(this.baseUrl + "/get", { headers })
  }

  add(){
    let headers = getHeaders()

  }

}
