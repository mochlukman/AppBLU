import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpjLpj } from '../interface/ispj-lpj';

@Injectable({
  providedIn: 'root'
})
export class SpjLpjService {
  constructor(private http: HttpClient) { }
  gets(Idlpj: number): Observable<ISpjLpj[]>{
    const qp = new HttpParams()
    .set('Idlpj', Idlpj.toString());
    return this.http.get<ISpjLpj[]>(`${environment.url}Spjlpj`, {params : qp}).pipe(map(resp => <ISpjLpj[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Spjlpj`, paramBody, {observe: 'response'});
  }
  delete(Idspjlpj: number){
    return this.http.request('DELETE',`${environment.url}Spjlpj/${Idspjlpj}`, {observe:'response'});
  }
}
