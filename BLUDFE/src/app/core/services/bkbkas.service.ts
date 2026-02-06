import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBkbkas } from '../interface/ibkbkas';

@Injectable({
  providedIn: 'root'
})
export class BkbkasService {

  constructor(private http: HttpClient) { }
  gets(param: any): Observable<IBkbkas[]>{
    return this.http.get<IBkbkas[]>(`${environment.url}Bkbkas`, {params: param}).pipe(map(resp => <IBkbkas[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bkbkas`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Bkbkas`, paramBody, {observe: 'response'});
  }
  delete(Nobbantu: string){
    return this.http.request('DELETE', `${environment.url}Bkbkas/${Nobbantu}`, {observe: 'response'});
  }
}
