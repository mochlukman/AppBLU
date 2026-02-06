import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPanjardet } from '../interface/ipanjardet';

@Injectable({
  providedIn: 'root'
})
export class PanjardetService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  gets(idpanjar: number):Observable<IPanjardet[]>{
    const queryParam = new HttpParams().set('idpanjar', idpanjar.toString());
    return this.http.get<IPanjardet[]>(`${environment.url}Panjardet`, {params: queryParam}).pipe(map(resp => <IPanjardet[]>resp));
  }
  get(idpanjardet:number){
    return this.http.get<IPanjardet>(`${environment.url}Panjardet/${idpanjardet}`).pipe(map(resp => <IPanjardet>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Panjardet`,paramBody, {observe:'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Panjardet`,paramBody, {observe:'response'});
  }
  delete(idpanjardet:number){
    return this.http.request('DELETE',`${environment.url}Panjardet/${idpanjardet}`,{observe:'response'});
  }
}
