import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Sp3bdetService {

  constructor(private http: HttpClient) { }
  gets(param: any){
    return this.http.get(`${environment.url}Sp3bdet`, {params: param}).pipe(map(resp => <any>resp));
  }
  delete(Id : number){
    return this.http.request('DELETE', `${environment.url}Sp3bdet/${Id}`, {observe: 'response'});
  }
}
