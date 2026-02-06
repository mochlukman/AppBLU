import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISkpdet } from '../interface/iskpdet';

@Injectable({
  providedIn: 'root'
})
export class SkpdetService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  private dataSelected = new BehaviorSubject(<ISkpdet>null);
  public _dataSelected = this.dataSelected.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  setDataSelected(e: ISkpdet){
    this.dataSelected.next(e);
  }
  gets(Idskp: number) : Observable<ISkpdet[]>{
    const param = new HttpParams()
      .set('Idskp', Idskp.toString());
    return this.http.get<ISkpdet[]>(`${environment.url}Skpdet`, {params: param})
      .pipe(map(resp => <ISkpdet[]>resp));
  }
  get(Idskpdet:number) : Observable<ISkpdet>{
    return this.http.get(`${environment.url}Skpdet/${Idskpdet}`)
      .pipe(map(resp => <ISkpdet>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Skpdet`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Skpdet`, paramBody, {observe: 'response'});
  }
  delete(Idskpdet:number){
    return this.http.request('DELETE', `${environment.url}Skpdet/${Idskpdet}`, {observe: 'response'});
  }
}