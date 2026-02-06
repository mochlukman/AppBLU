import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDpdet } from '../interface/idpdet';

@Injectable({
  providedIn: 'root'
})
export class DpdetService {

  constructor(private http: HttpClient) { }
  gets(Iddp: number): Observable<IDpdet[]>{
    const qp = new HttpParams().set('Iddp', Iddp.toString());
    return this.http.get<IDpdet[]>(`${environment.url}Dpdet`, {params: qp}).pipe(map(resp => <IDpdet[]>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Dpdet`, postBody, {observe: 'response'});
  }
  delete(iddpdet: number){
    return this.http.request('DELETE', `${environment.url}Dpdet/${iddpdet}`, {observe: 'response'});
  }
}
