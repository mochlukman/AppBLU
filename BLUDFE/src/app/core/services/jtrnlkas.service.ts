import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJtrnlkas } from '../interface/ijtrnlkas';

@Injectable({
  providedIn: 'root'
})
export class JtrnlkasService {
  constructor(private http: HttpClient) { }
  gets(param?: any): Observable<IJtrnlkas[]>{
    return this.http.get<IJtrnlkas[]>(`${environment.url}Jtrnlkas`, {params: param}).pipe(map(resp => <IJtrnlkas[]>resp));
  }
  get(Idnojetra: number){
    return this.http.get<IJtrnlkas>(`${environment.url}Jtrnlkas/${Idnojetra}`).pipe(map(resp => <IJtrnlkas>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Jtrnlkas`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Jtrnlkas`, paramBody, {observe: 'response'});
  }
  delete(Idnojetra: number){
    return this.http.request('DELETE', `${environment.url}Jtrnlkas/${Idnojetra}`, {observe: 'response'});
  }
}
