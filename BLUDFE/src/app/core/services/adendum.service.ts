import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAdendum } from '../interface/iadendum';

@Injectable({
  providedIn: 'root'
})
export class AdendumService {

  constructor(private http: HttpClient) { }
  gets(Idunit: number, Idkeg: number) : Observable<IAdendum[]>{
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idkeg', Idkeg.toString());
    return this.http.get<IAdendum[]>(`${environment.url}Adendum`, {params : param})
      .pipe(map(resp => <IAdendum[]>resp));
  }
  get(Idadd: number){
    return this.http.get<IAdendum>(`${environment.url}Adendum/${Idadd}`).pipe(map(resp => <IAdendum>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Adendum`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Adendum`, paramBody, {observe: 'response'});
  }
  delete(Idadd: number){
    return this.http.request('DELETE', `${environment.url}Adendum/${Idadd}`, {observe: 'response'});
  }
}
