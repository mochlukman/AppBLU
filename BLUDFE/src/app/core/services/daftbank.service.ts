import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDaftbank } from '../interface/idaftbank';

@Injectable({
  providedIn: 'root'
})
export class DaftbankService {

  constructor(private http: HttpClient) { }
  gets() : Observable<IDaftbank[]>{
    return this.http.get<IDaftbank[]>(`${environment.url}Daftbank`)
      .pipe(map(resp => <IDaftbank[]>resp));
  }
  get(Idbank: number){
    return this.http.get<IDaftbank>(`${environment.url}Daftbank/${Idbank}`)
      .pipe(map(resp => <IDaftbank>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Daftbank`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Daftbank`, paramBody, {observe: 'response'});
  }
  delete(Idbank: number){
    return this.http.request('DELETE', `${environment.url}Daftbank/${Idbank}`, {observe: 'response'});
  }
}
