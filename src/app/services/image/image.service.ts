import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeaders } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = "http://127.0.0.1:8080/image"

  constructor(private http: HttpClient) { }

  upload(selectedFile: any, id:any ){
    let headers = getHeaders()
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', selectedFile, selectedFile.name)
    //let url = this.baseUrl + "/upload?file=" + uploadImageData + "&id=" + id
    return this.http.post<any>('http://localhost:8080/image/upload', uploadImageData, {headers})
  }

  get(id:any){
    let headers = getHeaders()
    let url = this.baseUrl + "/get?id=" + id 
    return this.http.get<any>(url, {headers})
  }
}
