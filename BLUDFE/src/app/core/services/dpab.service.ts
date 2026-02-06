import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDpab } from '../interface/idpab';

@Injectable({
  providedIn: 'root'
})
export class DpabService {
  private rekSelected = new BehaviorSubject(<IDpab>null);
  public _rekSelected = this.rekSelected.asObservable();
  private tabIndex = new BehaviorSubject(<number>0);
	public _tabIndex = this.tabIndex.asObservable();
  private niliaRek = new BehaviorSubject(<number>0);
	public _nilaiRek = this.niliaRek.asObservable();
  constructor(private http: HttpClient) { }
  gets(Iddpa: number, Kdtahap: string) : Observable<IDpab[]>{
    const param = new HttpParams()
      .set('Iddpa', Iddpa.toString())
      .set('Kdtahap', Kdtahap);
    return this.http.get<IDpab[]>(`${environment.url}Dpab`, {params: param})
      .pipe(map(resp => <IDpab[]>resp))
  }
  setRekSelected(data: IDpab): void{
    this.rekSelected.next(data);
  }
  setTabindex(e: number): void{
    this.tabIndex.next(e);
  }
  setNilaiRek(data: number): void{
		this.niliaRek.next(data);
	}
  getByStsdetd(Idunit: number, Idsts: number){
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idsts', Idsts.toString());
      return this.http.get<IDpab[]>(`${environment.url}Dpab/by-stsdetd`, {params: param})
      .pipe(map(resp => <IDpab[]>resp));
  }
}
