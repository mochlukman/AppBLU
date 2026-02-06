import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpddetr, ISpddetrData, ISpddetrTreeRoot } from '../interface/ispd';

@Injectable({
  providedIn: 'root'
})
export class SpddetrService {
  private rekSelected = new BehaviorSubject(<ISpddetrData>null);
  public _rekSelected = this.rekSelected.asObservable();
  private niliaRek = new BehaviorSubject(<number>0);
	public _nilaiRek = this.niliaRek.asObservable();
  private tabIndex = new BehaviorSubject(<number>0);
  public _tabIndex = this.tabIndex.asObservable();
  constructor(private http: HttpClient) { }
  setTabIndex(e: number):void{
    this.tabIndex.next(e);
  }
  gets(Idspd: number, Idkeg: number) : Observable<ISpddetr[]>{
    const param = new HttpParams()
      .set('Idspd', Idspd.toString())
      .set('Idkeg', Idkeg.toString());
    return this.http.get<ISpddetr[]>(`${environment.url}Spddetr`, {params: param})
      .pipe(map(resp => <ISpddetr[]>resp))
  }
  getsTreeTable(Idspd: number): Observable<ISpddetrTreeRoot[]>{
    const param = new HttpParams().set('Idspd', Idspd.toString());
    return this.http.get<ISpddetrTreeRoot[]>(`${environment.url}Spddetr/treetable-from-subkegiatan`, {params : param})
      .pipe(map(resp => <ISpddetrTreeRoot[]>resp));
  }
  getsTotalNilai(Idunit: number, Idspd: number){
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idspd', Idspd.toString());
    return this.http.get(`${environment.url}Spddetr/total-nilai`, {params: param})
      .pipe(map(resp => <any>resp))
  }
  setRekSelected(data: ISpddetrData): void{
    this.rekSelected.next(data);
  }
  setNilaiRek(data: number): void{
		this.niliaRek.next(data);
	}
  putNilai(paramBody: any){
    return this.http.put(`${environment.url}Spddetr/update-nilai`, paramBody, {observe: 'response'});
  }
  delete(Idspddetr: number){
    return this.http.request('DELETE', `${environment.url}Spddetr/${Idspddetr}`, {observe: 'response'});
  }
}
