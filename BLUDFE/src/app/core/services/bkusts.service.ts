import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBkusts } from '../interface/ibkusts';

@Injectable({
  providedIn: 'root'
})
export class BkustsService {
  constructor(private http: HttpClient) { }
  gets(Idunit: number, Idbend: number) : Observable<IBkusts[]>{
    const qp = new HttpParams()
    .set('Idunit', Idunit.toString())
    .set('Idbend', Idbend.toString());
    return this.http.get<IBkusts[]>(`${environment.url}Bkusts`, {params: qp}).pipe(map(resp => <IBkusts[]>resp));
  }
  getsForSpjtr(Idspjtr: number, Idunit: number, Idbend: number) : Observable<IBkusts[]>{
    const qp = new HttpParams()
    .set('Idspjtr', Idspjtr.toString())
    .set('Idunit', Idunit.toString())
    .set('Idbend', Idbend.toString());
    return this.http.get<IBkusts[]>(`${environment.url}Bkusts/for-spjtr`, {params: qp}).pipe(map(resp => <IBkusts[]>resp));
  }
}