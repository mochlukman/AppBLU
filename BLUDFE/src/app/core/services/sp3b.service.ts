import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Sp3bService {

  constructor(private http: HttpClient) { }
  gets(param: any){
    return this.http.get(`${environment.url}sp3b`, {params: param}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}sp3b`, paramBody, {observe: 'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}sp3b/pengesahan`, paramBody, {observe: 'response'});
  }
  delete(Id : number){
    return this.http.request('DELETE', `${environment.url}sp3b/${Id}`, {observe: 'response'});
  }
}
