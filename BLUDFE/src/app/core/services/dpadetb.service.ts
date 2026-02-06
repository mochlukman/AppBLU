import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDpadetb } from '../interface/idpadetb';

@Injectable({
  providedIn: 'root'
})
export class DpadetbService {
  constructor(private http: HttpClient) { }
  gets(Iddpab: number) : Observable<IDpadetb[]>{
    const param = new HttpParams().set('Iddpab', Iddpab.toString());
    return this.http.get<IDpadetb[]>(`${environment.url}Dpadetb`, {params: param})
      .pipe(map(resp => <IDpadetb[]>resp))
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Dpadetb`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
      return this.http.put(`${environment.url}Dpadetb`, paramBody, { observe: 'response'});
  }
  delete(Iddpadet: number){
    return this.http.request('DELETE', `${environment.url}Dpadetb/${Iddpadet}`, {
      observe: 'response'
    });
  }
}
