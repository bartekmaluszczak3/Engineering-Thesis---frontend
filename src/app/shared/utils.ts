import { HttpHeaders } from "@angular/common/http"

export function getHeaders(){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    return headers
}

export function mapImageList(imageBytes: any[]){
    for(let i=0; i<imageBytes.length; i++){
      imageBytes[i] = "data:image/JPEG;base64," + imageBytes[i]
    }
    return imageBytes
  }