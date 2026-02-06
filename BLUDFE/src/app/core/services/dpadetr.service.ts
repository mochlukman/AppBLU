import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDpadetr } from '../interface/idpadetr';

@Injectable({
  providedIn: 'root'
})
export class DpadetrService {
  constructor(private http: HttpClient) { }
  gets(Iddpar: number) : Observable<IDpadetr[]>{
    const param = new HttpParams().set('Iddpar', Iddpar.toString());
    return this.http.get<IDpadetr[]>(`${environment.url}Dpadetr`, {params: param})
      .pipe(map(resp => <IDpadetr[]>resp))
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Dpadetr`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
      return this.http.put(`${environment.url}Dpadetr`, paramBody, { observe: 'response'});
  }
  delete(Iddpadet: number){
    return this.http.request('DELETE', `${environment.url}Dpadetr/${Iddpadet}`, {
      observe: 'response'
    });
  }
}
