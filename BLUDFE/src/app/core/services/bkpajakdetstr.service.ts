import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBkpajakdetstr } from '../interface/ibkpajakdetstr';

@Injectable({
  providedIn: 'root'
})
export class BkpajakdetstrService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  gets(Idbkpajak: number) : Observable<IBkpajakdetstr[]>{
    const queryParam = new HttpParams()
      .set('Idbkpajak', Idbkpajak.toString());
    return this.http.get<IBkpajakdetstr[]>(`${environment.url}Bkpajakdetstr`,{params: queryParam}).pipe(map(resp => <IBkpajakdetstr[]>resp));
  }
  get(idbkpajakdetstr: number){
    return this.http.get<IBkpajakdetstr>(`${environment.url}Bkpajakdetstr/${idbkpajakdetstr}`).pipe(map(resp => <IBkpajakdetstr>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bkpajakdetstr`,paramBody, {observe:'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Bkpajakdetstr`,paramBody, {observe:'response'});
  }
  delete(idbkpajakdetstr: number){
    return this.http.request('DELETE',`${environment.url}Bkpajakdetstr/${idbkpajakdetstr}`,{observe: 'response'});
  }
}
