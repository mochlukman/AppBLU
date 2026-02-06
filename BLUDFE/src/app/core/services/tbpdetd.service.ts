import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITbpdetd } from '../interface/itbpdetd';

@Injectable({
  providedIn: 'root'
})
export class TbpdetdService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private dataSelected = new BehaviorSubject(<ITbpdetd>null);
  public _dataSelected = this.dataSelected.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setDataSelected(e: ITbpdetd){
    this.dataSelected.next(e);
  }
  gets(Idtbp: number) : Observable<ITbpdetd[]>{
    const param = new HttpParams()
      .set('Idtbp', Idtbp.toString());
    return this.http.get<ITbpdetd[]>(`${environment.url}Tbpdetd`, {params: param})
      .pipe(map(resp => <ITbpdetd[]>resp));
  }
  get(Idtbpdetd:number) : Observable<ITbpdetd>{
    return this.http.get(`${environment.url}Tbpdetd/${Idtbpdetd}`)
      .pipe(map(resp => <ITbpdetd>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Tbpdetd`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Tbpdetd`, paramBody, {observe: 'response'});
  }
  delete(Idtbpdetd:number){
    return this.http.request('DELETE', `${environment.url}Tbpdetd/${Idtbpdetd}`, {observe: 'response'});
  }
}
