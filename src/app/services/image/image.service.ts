import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeaders } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = "http://127.0.0.1:8080/image"

  constructor(private http: HttpClient) { }

  upload(selectedFile: any[], id:any ){
    let headers = getHeaders()
    let url = this.baseUrl + "/upload?id=" + id
    selectedFile.forEach(element =>{
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', element, element.name)
      this.http.post<any>(url,uploadImageData, {headers}).subscribe()
      console.log("elo")
    })
  
    return ""
  }

  get(id:any){
    let headers = getHeaders()
    let url = this.baseUrl + "/get?id=" + id 
    return this.http.get<any>(url, {headers})
  }

  delete(id:any){
    let headers = getHeaders()
    console.log(id)
    let url = this.baseUrl + "/delete?id=" + id 
    return this.http.delete<any>(url, {headers})

  }
}
