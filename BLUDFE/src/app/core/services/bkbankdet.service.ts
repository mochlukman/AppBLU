import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBkbankdet } from '../interface/ibkbankdet';

@Injectable({
  providedIn: 'root'
})
export class BkbankdetService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private dataSelected = new BehaviorSubject(<IBkbankdet>null);
  public _dataSelected = this.dataSelected.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setDataSelected(e: IBkbankdet){
    this.dataSelected.next(e);
  }
  gets(Idbkbank: number): Observable<IBkbankdet[]>{
    const params = new HttpParams()
      .set('Idbkbank', Idbkbank.toString());
    return this.http.get(`${environment.url}Bkbankdet`,{params: params}).pipe(map(resp => <IBkbankdet[]>resp));
  }
  get(Idbankdet: number){
    return this.http.get(`${environment.url}Bkbankdet/${Idbankdet}`).pipe(map(resp => <IBkbankdet>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bkbankdet`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Bkbankdet`, paramBody, {observe: 'response'});
  }
  delete(Idbankdet: number){
    return this.http.request('DELETE', `${environment.url}Bkbankdet/${Idbankdet}`, {observe: 'response'});
  }
}
