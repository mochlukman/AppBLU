import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDaftdok } from '../interface/idaftdok';

@Injectable({
  providedIn: 'root'
})
export class DaftdokService {

  constructor(private http: HttpClient) { }
  gets(): Observable<IDaftdok[]>{
    return this.http.get<IDaftdok[]>(`${environment.url}Daftdok`).pipe(map(resp => <IDaftdok[]>resp));
  }
  get(Iddafdok: number): Observable<IDaftdok>{
    return this.http.get<IDaftdok>(`${environment.url}Daftdok/${Iddafdok}`).pipe(map(resp => <IDaftdok>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Daftdok`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Daftdok`, paramBody, {observe: 'response'});
  }
  delete(Iddafdok: number){
    return this.http.request('DELETE', `${environment.url}Daftdok/${Iddafdok}`, {observe:'response'});
  }
}
