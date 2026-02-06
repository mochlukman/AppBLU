import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBkutbp } from '../interface/ibkutbp';

@Injectable({
  providedIn: 'root'
})
export class BkutbpService {

  constructor(private http: HttpClient) { }
  gets(Idunit: number, Idbend: number) : Observable<IBkutbp[]>{
    const qp = new HttpParams()
    .set('Idunit', Idunit.toString())
    .set('Idbend', Idbend.toString());
    return this.http.get<IBkutbp[]>(`${environment.url}Bkutbp`, {params: qp}).pipe(map(resp => <IBkutbp[]>resp));
  }
  getsForSpjtr(Idspjtr: number, Idunit: number, Idbend: number) : Observable<IBkutbp[]>{
    const qp = new HttpParams()
    .set('Idspjtr', Idspjtr.toString())
    .set('Idunit', Idunit.toString())
    .set('Idbend', Idbend.toString());
    return this.http.get<IBkutbp[]>(`${environment.url}Bkutbp/for-spjtr`, {params: qp}).pipe(map(resp => <IBkutbp[]>resp));
  }
}
