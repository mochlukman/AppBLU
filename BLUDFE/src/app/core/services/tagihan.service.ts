import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITagihan } from '../interface/itagihan';

@Injectable({
  providedIn: 'root'
})
export class TagihanService {
  private tagihanSelected = new BehaviorSubject(<ITagihan>null);
  public _tagihanSelected = this.tagihanSelected.asObservable();
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setTagihanSelected(data: ITagihan):void{
    this.tagihanSelected.next(data);
  }
  paging(params: any){
    return this.http.get(`${environment.url}Tagihan/paging/list`,{params: params}).pipe(map(resp => <any>resp));
  }
  gets(params: any):Observable<ITagihan[]>{
    // const param = new HttpParams()
    //   .set('Idunit', Idunit.toString())
    //   .set('Idkeg', Idkeg.toString())
    //   .set('Kdstatus', Kdstatus ? Kdstatus : '');
    return this.http.get<ITagihan[]>(`${environment.url}Tagihan/list`,{params: params})
      .pipe(map(resp => <ITagihan[]>resp));
  }
  getByKontrak(Idkontrak: number, Idunit?: number, Idkeg?: number){
    const param = new HttpParams()
      .set('Idkontrak', Idkontrak.toString())
      .set('Idunit', Idunit ? Idunit.toString() : '0')
      .set('Idkeg', Idkeg ? Idkeg.toString() : '0');
    return this.http.get(`${environment.url}Tagihan/by-kontrak`,{params: param}).pipe(map(resp => <ITagihan>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Tagihan`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Tagihan`, paramBody, {observe: 'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Tagihan/pengesahan`, paramBody, {observe: 'response'});
  }
  delete(Idtagihan: number){
    return this.http.request('DELETE',`${environment.url}Tagihan/${Idtagihan}`, {observe: 'response'});
  }
}
