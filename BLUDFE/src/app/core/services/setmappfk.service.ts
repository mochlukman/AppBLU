import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetmappfkService {
  constructor(private http: HttpClient) { }
  gets(params?: any):Observable<any[]>{
    const queryParam = new HttpParams({fromObject: params})
    return this.http.get<any[]>(`${environment.url}Setmappfk`, {params: queryParam}).pipe(map(resp => <any[]>resp));
  }
  post(postbody: any){
    return this.http.post(`${environment.url}Setmappfk`, postbody, {observe: 'response'});
  }
  delete(id: number){
    return this.http.request('DELETE', `${environment.url}Setmappfk/${id}`, {observe: 'response'});
  }
}
