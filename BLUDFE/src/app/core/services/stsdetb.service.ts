import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IStsdetb } from '../interface/istsdetb';

@Injectable({
  providedIn: 'root'
})
export class StsdetbService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  gets(Idsts: number) : Observable<IStsdetb[]>{
    const param = new HttpParams()
      .set('Idsts', Idsts.toString());
    return this.http.get<IStsdetb[]>(`${environment.url}Stsdetb`, {params: param})
      .pipe(map(resp => <IStsdetb[]>resp));
  }
  get(Idstsdetb:number) : Observable<IStsdetb>{
    return this.http.get(`${environment.url}Stsdetb/${Idstsdetb}`)
      .pipe(map(resp => <IStsdetb>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Stsdetb`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Stsdetb`, paramBody, {observe: 'response'});
  }
  delete(Idstsdetb:number){
    return this.http.request('DELETE', `${environment.url}Stsdetb/${Idstsdetb}`, {observe: 'response'});
  }
}
