import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDpadetd } from '../interface/idpadetd';

@Injectable({
  providedIn: 'root'
})
export class DpadetdService {
  constructor(private http: HttpClient) { }
  gets(Iddpad: number) : Observable<IDpadetd[]>{
    const param = new HttpParams().set('Iddpad', Iddpad.toString());
    return this.http.get<IDpadetd[]>(`${environment.url}Dpadetd`, {params: param})
      .pipe(map(resp => <IDpadetd[]>resp))
  }
  post(paramBody: any){
      return this.http.post(`${environment.url}Dpadetd`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
      return this.http.put(`${environment.url}Dpadetd`, paramBody, { observe: 'response'});
  }
  delete(Iddpadet: number){
    return this.http.request('DELETE', `${environment.url}Dpadetd/${Iddpadet}`, {
      observe: 'response'
    });
  }
}
