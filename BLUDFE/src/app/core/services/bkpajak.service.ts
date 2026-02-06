import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBkpajak } from '../interface/ibkpajak';

@Injectable({
  providedIn: 'root'
})
export class BkpajakService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private dataSelected = new BehaviorSubject(<IBkpajak>null);
  public _dataSelected = this.dataSelected.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setDataSelected(data: IBkpajak):void{
    this.dataSelected.next(data);
  }
  gets(Idunit: number, Idbend: number, Kdstatus: string) : Observable<IBkpajak[]>{
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idbend', Idbend.toString())
      .set('Kdstatus', Kdstatus);
    return this.http.get<IBkpajak[]>(`${environment.url}Bkpajak`,{params: queryParam}).pipe(map(resp => <IBkpajak[]>resp));
  }
  get(idbkpajak: number){
    return this.http.get<IBkpajak>(`${environment.url}Bkpajak/${idbkpajak}`).pipe(map(resp => <IBkpajak>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Bkpajak`,paramBody, {observe:'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Bkpajak`,paramBody, {observe:'response'});
  }
  delete(idbkpajak: number){
    return this.http.request('DELETE',`${environment.url}Bkpajak/${idbkpajak}`,{observe: 'response'});
  }
  getForBku(Idunit: number, Idbend: number){
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idbend', Idbend.toString());
    return this.http.get(`${environment.url}Bkpajak/For-Bku`, {params: queryParam}).pipe(map(resp => <any>resp));
  }
}
