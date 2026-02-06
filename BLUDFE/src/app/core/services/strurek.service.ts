import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IStrurek } from '../interface/istrurek';

@Injectable({
  providedIn: 'root'
})
export class StrurekService {

  constructor(public http: HttpClient) { }
  gets(): Observable<IStrurek[]>{
    return this.http.get<IStrurek[]>(`${environment.url}Strurek`).pipe(map(resp => <IStrurek[]>resp));
  }
  get(Idstrurek: number){
    return this.http.get(`${environment.url}Strurek/${Idstrurek}`).pipe(map(resp => <IStrurek>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Strurek`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Strurek`, paramBody, {observe: 'response'});
  }
  delete(Idstrurek: number){
    return this.http.request('DELETE',`${environment.url}Strurek/${Idstrurek}`, {observe: 'response'});
  }
}
