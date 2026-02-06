import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITbpdettkeg } from '../interface/itbpdettkeg';

@Injectable({
  providedIn: 'root'
})
export class TbpdettkegService {

  constructor(private http: HttpClient) { }
  gets(Idtbpdett: number):Observable<ITbpdettkeg[]>{
    const queryParam = new HttpParams().set('Idtbpdett', Idtbpdett.toString());
    return this.http.get<ITbpdettkeg[]>(`${environment.url}Tbpdettkeg`, {params: queryParam}).pipe(map(resp => <ITbpdettkeg[]>resp));
  }
  get(idtbpdettkeg:number){
    return this.http.get<ITbpdettkeg>(`${environment.url}Tbpdettkeg/${idtbpdettkeg}`).pipe(map(resp => <ITbpdettkeg>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Tbpdettkeg`,paramBody, {observe:'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Tbpdettkeg`,paramBody, {observe:'response'});
  }
  delete(idtbpdettkeg:number){
    return this.http.request('DELETE',`${environment.url}Tbpdettkeg/${idtbpdettkeg}`,{observe:'response'});
  }
}
