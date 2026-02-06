import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Sp2bdetService {

  constructor(private http: HttpClient) { }
  gets(param: any){
    return this.http.get(`${environment.url}Sp2bdet`, {params: param}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Sp2bdet`, paramBody, {observe: 'response'});
  }
  rincianSP2B(param: any){
    return this.http.get(`${environment.url}Sp2bdet/RincianSP2B`, {params: param}).pipe(map(resp => <any>resp));
  }
  rincianSP3B(param: any){
    return this.http.get(`${environment.url}Sp2bdet/RincianSP3B`, {params: param}).pipe(map(resp => <any>resp));
  }
  delete(Id : number){
    return this.http.request('DELETE', `${environment.url}Sp2bdet/${Id}`, {observe: 'response'});
  }
}
