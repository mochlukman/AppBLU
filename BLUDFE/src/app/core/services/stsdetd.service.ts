import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IStsdetd } from '../interface/istsdetd';

@Injectable({
  providedIn: 'root'
})
export class StsdetdService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  gets(Idsts: number) : Observable<IStsdetd[]>{
    const param = new HttpParams()
      .set('Idsts', Idsts.toString());
    return this.http.get<IStsdetd[]>(`${environment.url}Stsdetd`, {params: param})
      .pipe(map(resp => <IStsdetd[]>resp));
  }
  get(Idstsdetd:number) : Observable<IStsdetd>{
    return this.http.get(`${environment.url}Stsdetd/${Idstsdetd}`)
      .pipe(map(resp => <IStsdetd>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Stsdetd`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Stsdetd`, paramBody, {observe: 'response'});
  }
  delete(Idstsdetd:number){
    return this.http.request('DELETE', `${environment.url}Stsdetd/${Idstsdetd}`, {observe: 'response'});
  }
}