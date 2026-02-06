import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRkadanar } from '../interface/irkadanar';

@Injectable({
  providedIn: 'root'
})
export class RkadanarService {

  constructor(private http: HttpClient) { }
  gets(Idrkar: number): Observable<IRkadanar[]> {
    const qp = new HttpParams().set('Idrkar', Idrkar.toString());
    return this.http.get<IRkadanar[]>(`${environment.url}Rkadanar`, { params: qp }).pipe(map(resp => <IRkadanar[]>resp));
  }
  get(idrkadanar: number) {
    return this.http.get(`${environment.url}Rkadanar/${idrkadanar}`).pipe(map(resp => <IRkadanar>resp));
  }
  post(postBody: any) {
    return this.http.post(`${environment.url}Rkadanar`, postBody, { observe: 'response' });
  }
  put(postBody: any) {
    return this.http.put(`${environment.url}Rkadanar`, postBody, { observe: 'response' });
  }
  delete(idrkadanar: number) {
    return this.http.request('DELETE', `${environment.url}Rkadanar/${idrkadanar}`, { observe: 'response' });
  }
}
