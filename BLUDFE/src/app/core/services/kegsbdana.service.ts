import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IKegsbdana } from '../interface/ikegsbdana';

@Injectable({
  providedIn: 'root'
})
export class KegsbdanaService {

  constructor(private http: HttpClient) { }
  gets(Idkegunit: number): Observable<IKegsbdana[]> {
    const qp = new HttpParams().set('Idkegunit', Idkegunit.toString());
    return this.http.get<IKegsbdana[]>(`${environment.url}Kegsbdana`, { params: qp }).pipe(map(resp => <IKegsbdana[]>resp));
  }
  get(Idkegdana: number) {
    return this.http.get(`${environment.url}Kegsbdana/${Idkegdana}`).pipe(map(resp => <IKegsbdana>resp));
  }
  post(postBody: any) {
    return this.http.post(`${environment.url}Kegsbdana`, postBody, { observe: 'response' });
  }
  put(postBody: any) {
    return this.http.put(`${environment.url}Kegsbdana`, postBody, { observe: 'response' });
  }
  delete(Idkegdana: number) {
    return this.http.request('DELETE', `${environment.url}Kegsbdana/${Idkegdana}`, { observe: 'response' });
  }
}
