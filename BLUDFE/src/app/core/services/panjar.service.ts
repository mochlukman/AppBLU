import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPanjar } from '../interface/ipanjar';

@Injectable({
  providedIn: 'root'
})
export class PanjarService {
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
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private dataSelected = new BehaviorSubject(<IPanjar>null);
  public _dataSelected = this.dataSelected.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setDataSelected(data: IPanjar):void{
    this.dataSelected.next(data);
  }
  gets(): Observable<IPanjar[]>{
    const queryParam = new HttpParams()
      .set('Idunit', this.Idunit ? this.Idunit.toString() : "0")
      .set('Kdstatus', this.Kdstatus ? this.Kdstatus : "x")
      .set('Idxkode', this.Idxkode ? this.Idxkode.toString() : '0')
      .set('Idbend', this.Idbend ? this.Idbend.toString() : '0');
    return this.http.get<IPanjar[]>(`${environment.url}Panjar`, {params: queryParam}).pipe(map(resp => <IPanjar[]>resp));
  }
  get(Idpanjar : number){
    return this.http.get<IPanjar>(`${environment.url}Panjar/${Idpanjar}`).pipe(map(resp => <IPanjar>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Panjar`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Panjar`, paramBody, {observe: 'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Panjar/pengesahan`, paramBody, {observe: 'response'});
  }
  newNomorUrut(paramBody: any){
    return this.http.post(`${environment.url}panjar/new-nomor-urut`, paramBody,{observe: 'response'});
  }
  delete(Idpanjar : number){
    return this.http.request('DELETE', `${environment.url}Panjar/${Idpanjar}`, {observe: 'response'});
  }
  getForBku(Idunit: number, Idbend: number){
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idbend', Idbend.toString());
    return this.http.get(`${environment.url}Panjar/For-Bku`, {params: queryParam}).pipe(map(resp => <any>resp));
  }
}
