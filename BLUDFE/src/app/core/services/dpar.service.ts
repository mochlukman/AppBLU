import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDpar } from '../interface/idpar';

@Injectable({
  providedIn: 'root'
})
export class DparService {
  private rekSelected = new BehaviorSubject(<IDpar>null);
  public _rekSelected = this.rekSelected.asObservable();
  private tabIndex = new BehaviorSubject(<number>0);
	public _tabIndex = this.tabIndex.asObservable();
  private niliaRek = new BehaviorSubject(<number>0);
	public _nilaiRek = this.niliaRek.asObservable();
  constructor(private http: HttpClient) { }
  gets(Iddpa: number, Kdtahap: string, Idkeg: number) : Observable<IDpar[]>{
    const param = new HttpParams()
      .set('Iddpa', Iddpa.toString())
      .set('Kdtahap', Kdtahap)
      .set('Idkeg', Idkeg.toString());
    return this.http.get<IDpar[]>(`${environment.url}Dpar`, {params: param})
      .pipe(map(resp => <IDpar[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Dpar`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Dpar`, paramBody, {observe: 'response'});
  }
  setRekSelected(data: IDpar): void{
    this.rekSelected.next(data);
  }
  setTabindex(e: number): void{
    this.tabIndex.next(e);
  }
  setNilaiRek(data: number): void{
		this.niliaRek.next(data);
	}
  getByBpkdetr(Idunit: number, Idkeg: number, Idbpk: number){
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idkeg', Idkeg.toString())
      .set('Idbpk', Idbpk.toString());
      return this.http.get<IDpar[]>(`${environment.url}Dpar/by-bpkdetr`, {params: param})
      .pipe(map(resp => <IDpar[]>resp));
  }
}
