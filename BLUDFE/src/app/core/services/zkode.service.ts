import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IZkode } from '../interface/izkode';

@Injectable({
  providedIn: 'root'
})
export class ZkodeService {

  constructor(private http: HttpClient) { }
  gets(): Observable<IZkode[]>{
    return this.http.get<IZkode[]>(`${environment.url}Zkode`).pipe(map(resp => <IZkode[]>resp));
  }
  get(Idxkode: number){
    return this.http.get<IZkode>(`${environment.url}Zkode/${Idxkode}`).pipe(map(resp => <IZkode>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Zkode`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Zkode`, paramBody, {observe: 'response'});
  }
  delete(Idxkode: number){
    return this.http.request('DELETE', `${environment.url}Zkode/${Idxkode}`, {observe: 'response'});
  }
}
