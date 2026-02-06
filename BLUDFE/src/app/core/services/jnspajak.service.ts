import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJjnspajak } from '../interface/ijjnspajak';

@Injectable({
  providedIn: 'root'
})
export class JnspajakService {

  constructor(private http: HttpClient) { }
  gets() : Observable<IJjnspajak[]>{
    return this.http.get<IJjnspajak[]>(`${environment.url}Jnspajak`).pipe(map(resp => <IJjnspajak[]>resp));
  }
  get(idjnspajak: number){
    return this.http.get<IJjnspajak>(`${environment.url}Jnspajak/${idjnspajak}`).pipe(map(resp => <IJjnspajak>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Jnspajak`, postBody,{observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Jnspajak`, postBody,{observe: 'response'});
  }
  delete(idjnspajak: number){
    return this.http.request('DELETE',`${environment.url}Jnspajak/${idjnspajak}`, {observe: 'response'});
  }
}
