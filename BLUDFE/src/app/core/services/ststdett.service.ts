import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IStsdett } from '../interface/istsdett';

@Injectable({
  providedIn: 'root'
})
export class StstdettService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  gets(Idsts: number) : Observable<IStsdett[]>{
    const param = new HttpParams()
      .set('Idsts', Idsts.toString());
    return this.http.get<IStsdett[]>(`${environment.url}Stsdett`, {params: param})
      .pipe(map(resp => <IStsdett[]>resp));
  }
  get(Idstsdett:number) : Observable<IStsdett>{
    return this.http.get(`${environment.url}Stsdett/${Idstsdett}`)
      .pipe(map(resp => <IStsdett>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Stsdett`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Stsdett`, paramBody, {observe: 'response'});
  }
  delete(Idstsdett:number){
    return this.http.request('DELETE', `${environment.url}Stsdett/${Idstsdett}`, {observe: 'response'});
  }
}
