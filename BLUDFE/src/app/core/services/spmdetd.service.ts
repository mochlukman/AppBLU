import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ispmdetd } from '../interface/ispmdetd';

@Injectable({
  providedIn: 'root'
})
export class SpmdetdService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  gets(Idspm: number) : Observable<Ispmdetd[]>{
    const param = new HttpParams()
      .set('Idspm', Idspm.toString());
    return this.http.get<Ispmdetd[]>(`${environment.url}Spmdetd`, {params: param})
      .pipe(map(resp => <Ispmdetd[]>resp));
  }
  get(Idspmdetd:number) : Observable<Ispmdetd>{
    return this.http.get(`${environment.url}Spmdetd/${Idspmdetd}`)
      .pipe(map(resp => <Ispmdetd>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Spmdetd`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Spmdetd`, paramBody, {observe: 'response'});
  }
  delete(Idspmdetd:number){
    return this.http.request('DELETE', `${environment.url}Spmdetd/${Idspmdetd}`, {observe: 'response'});
  }
}
