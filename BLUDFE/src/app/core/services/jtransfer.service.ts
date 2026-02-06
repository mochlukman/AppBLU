import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJtransfer } from '../interface/ijtransfer';

@Injectable({
  providedIn: 'root'
})
export class JtransferService {

  constructor(private http: HttpClient) { }
  gets(): Observable<IJtransfer[]>{
    return this.http.get<IJtransfer[]>(`${environment.url}Jtransfer`).pipe(map(resp => <IJtransfer[]>resp));
  }
  get(Idjtransfer: number){
    return this.http.get<IJtransfer>(`${environment.url}Jtransfer/${Idjtransfer}`).pipe(map(resp => <IJtransfer>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Jtransfer`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Jtransfer`, paramBody, {observe: 'response'});
  }
  delete(Idjtransfer: number){
    return this.http.request('DELETE', `${environment.url}Jtransfer/${Idjtransfer}`, {observe: 'response'});
  }
}
