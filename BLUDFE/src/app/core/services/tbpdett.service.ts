import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITbpdett } from '../interface/itbpdett';

@Injectable({
  providedIn: 'root'
})
export class TbpdettService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private dataSelected = new BehaviorSubject(<ITbpdett>null);
  public _dataSelected = this.dataSelected.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setDataSelected(e: ITbpdett){
    this.dataSelected.next(e);
  }
  gets(Idtbp: number):Observable<ITbpdett[]>{
    const queryParam = new HttpParams()
      .set('Idtbp', Idtbp.toString());
    return this.http.get<ITbpdett[]>(`${environment.url}Tbpdett`, {params: queryParam}).pipe(map(resp => <ITbpdett[]>resp));
  }
  get(Idtbpdett: number){
    return this.http.get<ITbpdett>(`${environment.url}Tbpdett/${Idtbpdett}`).pipe(map(resp => <ITbpdett>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Tbpdett`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Tbpdett`, paramBody, {observe: 'response'});
  }
  delete(Idtbpdett: number){
    return this.http.request('DELETE', `${environment.url}Tbpdett/${Idtbpdett}`, {observe: 'response'});
  }
}
