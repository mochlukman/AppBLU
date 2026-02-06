import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ibend } from '../interface/ibend';

@Injectable({
  providedIn: 'root'
})
export class BendService {

  constructor(private http: HttpClient) { }
  gets(Idunit: number, Jnsbend?: string): Observable<Ibend[]>{
    const param = new HttpParams()
    .set('Idunit', Idunit.toString())
    .set('Jnsbend', Jnsbend ? Jnsbend : '');
    return this.http.get<Ibend[]>(`${environment.url}Bend`, {params: param})
      .pipe(map(resp => <Ibend[]>resp));
  }
  get(Idbend: number){
    return this.http.get(`${environment.url}Bend/${Idbend}`).pipe(map(resp => <Ibend>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bend`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Bend`, paramBody, {observe: 'response'});
  }
  delete(Idbend: number){
    return this.http.request('DELETE',`${environment.url}Bend/${Idbend}`, {observe: 'response'});
  }
}
