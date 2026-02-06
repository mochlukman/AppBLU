import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ispmdetb } from '../interface/ispmdetb';

@Injectable({
  providedIn: 'root'
})
export class SpmdetbService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  gets(Idspm: number) : Observable<Ispmdetb[]>{
    const param = new HttpParams()
      .set('Idspm', Idspm.toString());
    return this.http.get<Ispmdetb[]>(`${environment.url}Spmdetb`, {params: param})
      .pipe(map(resp => <Ispmdetb[]>resp));
  }
  get(Idspmdetb:number) : Observable<Ispmdetb>{
    return this.http.get(`${environment.url}Spmdetb/${Idspmdetb}`)
      .pipe(map(resp => <Ispmdetb>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Spmdetb`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Spmdetb`, paramBody, {observe: 'response'});
  }
  delete(Idspmdetb:number){
    return this.http.request('DELETE', `${environment.url}Spmdetb/${Idspmdetb}`, {observe: 'response'});
  }
}