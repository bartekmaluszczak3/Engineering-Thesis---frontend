import { HttpHeaders } from "@angular/common/http"

export function getHeaders(){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    return headers
}