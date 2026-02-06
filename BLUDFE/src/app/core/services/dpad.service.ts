import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDpad } from '../interface/idpad';

@Injectable({
  providedIn: 'root'
})
export class DpadService {
  private rekSelected = new BehaviorSubject(<IDpad>null);
  public _rekSelected = this.rekSelected.asObservable();
  private tabIndex = new BehaviorSubject(<number>0);
	public _tabIndex = this.tabIndex.asObservable();
  private niliaRek = new BehaviorSubject(<number>0);
	public _nilaiRek = this.niliaRek.asObservable();
  private Iddpa: number;
  set _iddpa(e: number){
    this.Iddpa = e;
  }
  private Kdtahap: string;
  set _kdtahap(e: string){
    this.Kdtahap = e;
  }
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Idskp: number;
  set _idskp(e: number){
    this.Idskp = e;
  }
  private Idtbp: number;
  set _idtbp(e: number){
    this.Idtbp = e;
  }
  private Idsts: number;
  set _idsts(e: number){
    this.Idsts = e;
  }
  constructor(private http: HttpClient) { }
  resetProp(){
    this.Iddpa = undefined;
    this.Idskp = undefined;
    this.Idsts = undefined;
    this.Idtbp = undefined;
    this.Idunit = undefined;
    this.Kdtahap = undefined;
  }
  gets() : Observable<IDpad[]>{
    const param = new HttpParams()
      .set('Iddpa', this.Iddpa ? this.Iddpa.toString() : "0")
      .set('Kdtahap', this.Kdtahap ? this.Kdtahap.trim() : "x")
      .set('Idskp', this.Idskp ? this.Idskp.toString() : "0")
      .set('Idtbp', this.Idtbp ? this.Idtbp.toString() : "0")
      .set('Idsts', this.Idsts ?  this.Idsts.toString() : "0")
      .set('Idunit', this.Idunit ? this.Idunit.toString() : "0");
    return this.http.get<IDpad[]>(`${environment.url}Dpad`, {params: param})
      .pipe(map(resp => {
        this.resetProp();
        return <IDpad[]>resp;
      }));
  }
  setRekSelected(data: IDpad): void{
    this.rekSelected.next(data);
  }
  setTabindex(e: number): void{
    this.tabIndex.next(e);
  }
  setNilaiRek(data: number): void{
		this.niliaRek.next(data);
	}
  put(postBody: any){
    return this.http.put(`${environment.url}Dpad`, postBody, {observe: 'response'});
  }
  delete(iddpad: number){
    return this.http.request('DELETE', `${environment.url}Dpad/${iddpad}`, {observe: 'response'});
  }
}
