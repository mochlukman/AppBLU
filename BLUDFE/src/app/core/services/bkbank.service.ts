import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBkbank } from '../interface/ibkbank';

@Injectable({
  providedIn: 'root'
})
export class BkbankService {
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Idbend: number;
  set _idbend(e: number){
    this.Idbend = e;
  }
  private Kdstatus: string;
  set _kdstatus(e: string){
    this.Kdstatus = e;
  }
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  gets(Idunit: number, Idbend: number, Kdstatus: string = null): Observable<IBkbank[]>{
    const params = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idbend', Idbend.toString())
      .set('Kdstatus', Kdstatus ? Kdstatus.toString() : "");
    return this.http.get(`${environment.url}Bkbank`,{params: params}).pipe(map(resp => <IBkbank[]>resp));
  }
  get(Idbkbank : number){
    return this.http.get(`${environment.url}Bkbank/${Idbkbank}`).pipe(map(resp => <IBkbank>resp));
  }
  getForBku(Idunit: number, Idbend: number){
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idbend', Idbend.toString());
    return this.http.get(`${environment.url}Bkbank/For-Bku`, {params: queryParam}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bkbank`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Bkbank`, paramBody, {observe: 'response'});
  }
  delete(Idbkbank: number){
    return this.http.request('DELETE', `${environment.url}Bkbank/${Idbkbank}`, {observe: 'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Bkbank/pengesahan`, paramBody, {observe: 'response'});
  }
}
