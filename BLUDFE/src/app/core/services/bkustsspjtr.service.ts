import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBkustsspjtr } from '../interface/ibkustsspjtr';

@Injectable({
  providedIn: 'root'
})
export class BkustsspjtrService {
  constructor(private http: HttpClient) { }
  gets(Idspjtr: number): Observable<IBkustsspjtr[]>{
    const qp = new HttpParams()
    .set('Idspjtr', Idspjtr.toString());
    return this.http.get<IBkustsspjtr[]>(`${environment.url}Bkustsspjtr`, {params : qp}).pipe(map(resp => <IBkustsspjtr[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bkustsspjtr`, paramBody, {observe: 'response'});
  }
  delete(idbkustsspjtr: number){
    return this.http.request('DELETE',`${environment.url}Bkustsspjtr/${idbkustsspjtr}`, {observe:'response'});
  }
}
