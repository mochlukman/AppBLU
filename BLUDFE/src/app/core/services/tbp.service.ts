import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITbp } from '../interface/itbp';

@Injectable({
  providedIn: 'root'
})
export class TbpService {
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Idbend: number;
  set _idbend(e: number){
    this.Idbend = e;
  }
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private dataSelected = new BehaviorSubject(<ITbp>null);
  public _dataSelected = this.dataSelected.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setDataSelected(data: ITbp):void{
    this.dataSelected.next(data);
  }
  
  gets(Idunit: number, Kdstatus: string, Idxkode: number, Idbend?: number, Tglvalid?: boolean, ExceptTbpsts?: boolean): Observable<ITbp[]>{
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Kdstatus', Kdstatus)
      .set('Idxkode', Idxkode.toString())
      .set('Idbend', Idbend ? Idbend.toString() : '0')
      .set('Tglvalid', Tglvalid ? 'true' : 'false')
      .set('ExceptTbpsts', ExceptTbpsts ? 'true' : 'false')
    return this.http.get<ITbp[]>(`${environment.url}Tbp`, {params: queryParam}).pipe(map(resp => <ITbp[]>resp));
  }
  get(Idtbp : number){
    return this.http.get<ITbp>(`${environment.url}Tbp/${Idtbp}`).pipe(map(resp => <ITbp>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Tbp`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Tbp`, paramBody, {observe: 'response'});
  }
  delete(Idtbp : number){
    return this.http.request('DELETE', `${environment.url}Tbp/${Idtbp}`, {observe: 'response'});
  }
  getForBku(Idunit: number, Idbend: number){
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idbend', Idbend.toString());
    return this.http.get(`${environment.url}Tbp/For-Bku`, {params: queryParam}).pipe(map(resp => <any>resp));
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Tbp/Pengesahan`, paramBody, {observe: 'response'});
  }
  getNoreg(params: any){
    return this.http.get(`${environment.url}Tbp/noreg`, {params: params}).pipe(map(resp => <any>resp));
  }
}
