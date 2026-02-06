import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BkuBudService {
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  generateNoBku(Idbend: number){
    const queryParam = new HttpParams()
      .set('Idbend', Idbend.toString());
    return this.http.get(`${environment.url}BkuBud/GenerateNoBku`,{params: queryParam}).pipe(map(resp => <any>resp));
  }
  gets(Jenis: string, Nobbantu: string, tgl1: string, tgl2: string) : Observable<any[]>{
    const queryParam = new HttpParams()
    .set('Jenis', Jenis)
    .set('Nobbantu', Nobbantu)
    .set('Tgl1', tgl1)
    .set('Tgl2', tgl2);
    return this.http.get(`${environment.url}BkuBud`, {params: queryParam}).pipe(map(resp => <any[]>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}BkuBud`, postBody, {observe: 'response'});
  }
  delete(Jenis: string, Nobukas: string){
    return this.http.request('DELETE', `${environment.url}BkuBud/${Jenis}/${Nobukas}`, {observe: 'response'});
  }
}
