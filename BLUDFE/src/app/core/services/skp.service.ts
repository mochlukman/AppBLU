import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISkp } from '../interface/iskp';

@Injectable({
  providedIn: 'root'
})
export class SkpService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private dataSelected = new BehaviorSubject(<ISkp>null);
  public _dataSelected = this.dataSelected.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setDataSelected(data: ISkp):void{
    this.dataSelected.next(data);
  }
  gets(Idunit: number, Idbend?: number, Kdstatus?: string, Idxkode?: number, istglvalid?: boolean): Observable<ISkp[]>{
    const queryParam = new HttpParams()
      .set('Idunit', Idunit ? Idunit.toString() : '0')
      .set('Kdstatus', Kdstatus ? Kdstatus : 'x')
      .set('Idxkode', Idxkode ? Idxkode.toString() : '1')
      .set('Idbend', Idbend ? Idbend.toString() : '0')
      .set('istglvalid', istglvalid ? istglvalid.toString() : 'false');
    return this.http.get<ISkp[]>(`${environment.url}Skp`, {params: queryParam}).pipe(map(resp => <ISkp[]>resp));
  }
  get(Idskp : number){
    return this.http.get<ISkp>(`${environment.url}Skp/${Idskp}`).pipe(map(resp => <ISkp>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Skp`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Skp`, paramBody, {observe: 'response'});
  }
  pengesahan(paramBody: any){
    return this.http.put(`${environment.url}Skp/pengesahan`, paramBody, {observe: 'response'});
  }
  delete(Idskp : number){
    return this.http.request('DELETE', `${environment.url}Skp/${Idskp}`, {observe: 'response'});
  }
}
