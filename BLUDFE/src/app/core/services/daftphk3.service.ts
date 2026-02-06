import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDaftphk3 } from '../interface/idaftphk3';

@Injectable({
  providedIn: 'root'
})
export class Daftphk3Service {

  constructor(private http: HttpClient) { }
  gets(Idunit: number) : Observable<IDaftphk3[]>{
    const params = new HttpParams()
      .set('Idunit', Idunit.toString());
    return this.http.get<IDaftphk3[]>(`${environment.url}Daftphk3`, {params: params})
      .pipe(map(resp => <IDaftphk3[]>resp));
  }
  get(Idphk3: number){
    return this.http.get(`${environment.url}Daftphk3/${Idphk3}`).pipe(map(resp => <IDaftphk3>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Daftphk3`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Daftphk3`, paramBody, {observe: 'response'});
  }
  delete(idphk3: number){
    return this.http.request('DELETE', `${environment.url}Daftphk3/${idphk3}`, {observe: 'response'});
  }
}
