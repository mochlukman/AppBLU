import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITrackingdata } from '../interface/iglobal';
import { ISpm } from '../interface/ispm';

@Injectable({
  providedIn: 'root'
})
export class SpmService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Kdstatus: string;
  set _kdstatus(e: string){
    this.Kdstatus = e;
  }
  private Idxkode: number;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  private Idbend: number;
  set _idbend(e: number){
    this.Idbend = e;
  }
  private Idkeg: number;
  set _idkeg(e: number){
    this.Idkeg = e;
  }
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }

  paging(params: any){
    return this.http.get(`${environment.url}Spm/paging`,{params: params}).pipe(map(resp => <any>resp));
  }

  gets(): Observable<ISpm[]>{
    const param = new HttpParams()
      .set('Idunit', this.Idunit ?  this.Idunit.toString() : '0')
      .set('Kdstatus', this.Kdstatus ? this.Kdstatus : 'x')
      .set('Idxkode', this.Idxkode ? this.Idxkode.toString() : '0')
      .set('Idbend', this.Idbend ? this.Idbend.toString() : '0')
      .set('Idkeg', this.Idkeg ? this.Idkeg.toString() : '0');
    return this.http.get<ISpm[]>(`${environment.url}Spm`, {params: param})
      .pipe(map(resp => {
        this.resetProperty();
        return <ISpm[]>resp;
      }));
  }
    
  /*paging(params: any){
    return this.http.get(`${environment.url}Spm/paging`,{params: params}).pipe(map(resp => <any>resp));
  }*/
  resetProperty(){
    this.Idunit = undefined;
    this.Kdstatus = undefined;
    this.Idxkode = undefined;
    this.Idbend = undefined;
    this.Idkeg = undefined;
  }
  getNoreg(Idunit: number, Idbend?: number, Idxkode?: number, kdstatus?: string){
    const param = new HttpParams()
    .set('Idunit', Idunit.toString())
    .set('Idbend', Idbend ? Idbend.toString() : '0')
    .set('Idxkode', Idxkode ? Idxkode.toString() : '0')
    .set('kdstatus', kdstatus ? kdstatus : '');
    return this.http.get(`${environment.url}Spm/noreg`, {params: param}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Spm`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Spm`, paramBody, {observe: 'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Spm/pengesahan`, paramBody, {observe: 'response'});
  }
  penolakan(paramBody: any){
    return this.http.put(`${environment.url}Spm/penolakan`, paramBody, {observe: 'response'});
  }
  delete(Idspm: number){
    return this.http.request('DELETE',`${environment.url}Spm/${Idspm}`, {observe: 'response'});
  }
  tracking(id: number): Observable<ITrackingdata[]>{
    return this.http.get<ITrackingdata[]>(`${environment.url}Spm/tracking/${id}`).pipe(map(resp => <ITrackingdata[]>resp));
  }
}
