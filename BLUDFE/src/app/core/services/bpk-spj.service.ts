import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBpkSpj } from '../interface/ibpk-spj';

@Injectable({
  providedIn: 'root'
})
export class BpkSpjService {

  constructor(private http: HttpClient) { }
  gets(By: string, Idref: number): Observable<IBpkSpj[]>{
    const qp = new HttpParams()
    .set('By', By) //pilih berdasarkan Bpk/Spj
    .set('Idref', Idref.toString()); // masukan Idbpk / Idspj
    return this.http.get<IBpkSpj[]>(`${environment.url}Bpkspj`, {params : qp}).pipe(map(resp => <IBpkSpj[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bpkspj`, paramBody, {observe: 'response'});
  }
  delete(Idbpkspj: number){
    return this.http.request('DELETE',`${environment.url}Bpkspj/${Idbpkspj}`, {observe:'response'});
  }
}
