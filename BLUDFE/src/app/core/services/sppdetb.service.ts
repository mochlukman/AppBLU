import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISppdetb } from '../interface/isppdetb';

@Injectable({
  providedIn: 'root'
})
export class SppdetbService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  gets(Idspp: number): Observable<ISppdetb[]>{
    const param = new HttpParams()
      .set('Idspp', Idspp.toString());
    return this.http.get<ISppdetb[]>(`${environment.url}Sppdetb`,{params: param}).pipe(map(resp => <ISppdetb[]>resp));
  }
  get(Idsppdetb: number){
    return this.http.get<ISppdetb>(`${environment.url}Sppdetb/${Idsppdetb}`).pipe(map(resp => <ISppdetb>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Sppdetb`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Sppdetb`, paramBody, {observe: 'response'});
  }
  delete(Idsppdetb: number){
    return this.http.request('DELETE', `${environment.url}Sppdetb/${Idsppdetb}`, {observe: 'response'});
  }
  getTotalNilai(Idunit: number, Idxkode: number, Kdstatus: string, Idspd: number){
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idxkode', Idxkode.toString())
      .set('Kdstatus', Kdstatus)
      .set('Idspd', Idspd.toString());
      return this.http.get(`${environment.url}Sppdetb/total-nilai`,{params: param})
        .pipe(map(resp => <any>resp));
  }
}
