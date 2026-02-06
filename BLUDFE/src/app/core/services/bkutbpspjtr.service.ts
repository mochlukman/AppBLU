import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBkutbpspjtr } from '../interface/ibkutbpspjtr';

@Injectable({
  providedIn: 'root'
})
export class BkutbpspjtrService {

  constructor(private http: HttpClient) { }
  gets(Idspjtr: number): Observable<IBkutbpspjtr[]>{
    const qp = new HttpParams()
    .set('Idspjtr', Idspjtr.toString());
    return this.http.get<IBkutbpspjtr[]>(`${environment.url}Bkutbpspjtr`, {params : qp}).pipe(map(resp => <IBkutbpspjtr[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bkutbpspjtr`, paramBody, {observe: 'response'});
  }
  delete(idbkutbpspjtr: number){
    return this.http.request('DELETE',`${environment.url}Bkutbpspjtr/${idbkutbpspjtr}`, {observe:'response'});
  }
}
