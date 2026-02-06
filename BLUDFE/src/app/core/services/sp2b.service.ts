import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Sp2bService {
  constructor(private http: HttpClient) { }
  gets(param: any){
    return this.http.get(`${environment.url}sp2b`, {params: param}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}sp2b`, paramBody, {observe: 'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}sp2b/pengesahan`, paramBody, {observe: 'response'});
  }
  delete(Id : number){
    return this.http.request('DELETE', `${environment.url}sp2b/${Id}`, {observe: 'response'});
  }
}
