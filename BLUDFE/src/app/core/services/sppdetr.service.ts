import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISppdetr, ISppdetrTreeRoot } from '../interface/isppdetr';

@Injectable({
  providedIn: 'root'
})
export class SppdetrService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private dataSelected = new BehaviorSubject(<ISppdetr>null);
  public _dataSelected = this.dataSelected.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setDataSelected(e: ISppdetr){
    this.dataSelected.next(e);
  }
  gets(Idspp: number, Idkeg?: number): Observable<ISppdetr[]>{
    const param = new HttpParams()
      .set('Idspp', Idspp.toString())
      .set('Idkeg', Idkeg ? Idkeg.toString() : '0');
    return this.http.get<ISppdetr[]>(`${environment.url}Sppdetr`,{params: param}).pipe(map(resp => <ISppdetr[]>resp));
  }
  getsTreeTable(Idspp: number): Observable<ISppdetrTreeRoot[]>{
    const param = new HttpParams().set('Idspp', Idspp.toString());
    return this.http.get<ISppdetrTreeRoot[]>(`${environment.url}Sppdetr/treetable-from-subkegiatan`, {params : param})
      .pipe(map(resp => <ISppdetrTreeRoot[]>resp));
  }
  get(Idsppdetr: number){
    return this.http.get<ISppdetr>(`${environment.url}Sppdetr/${Idsppdetr}`).pipe(map(resp => <ISppdetr>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Sppdetr`, paramBody, {observe: 'response'});
  }
  postSingle(paramBody: any){
    return this.http.post(`${environment.url}Sppdetr/single`, paramBody, {observe: 'response'});
  }
  postMultiKeg(paramBody: any){
    return this.http.post(`${environment.url}Sppdetr/multi-keg`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Sppdetr`, paramBody, {observe: 'response'});
  }
  putNilai(paramBody: any){
    return this.http.put(`${environment.url}Sppdetr/update-nilai`, paramBody, {observe: 'response'});
  }
  delete(Idsppdetr: number){
    return this.http.request('DELETE', `${environment.url}Sppdetr/${Idsppdetr}`, {observe: 'response'});
  }
  getTotalNilai(Idunit: number, Idxkode: number, Kdstatus: string, Idspd: number){
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idxkode', Idxkode.toString())
      .set('Kdstatus', Kdstatus)
      .set('Idspd', Idspd.toString());
      return this.http.get(`${environment.url}Sppdetr/total-nilai`,{params: param})
        .pipe(map(resp => <any>resp));
  }
}
