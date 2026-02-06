import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpddetb } from '../interface/ispd';

@Injectable({
  providedIn: 'root'
})
export class SpddetbService {
  private rekSelected = new BehaviorSubject(<ISpddetb>null);
  public _rekSelected = this.rekSelected.asObservable();
  private niliaRek = new BehaviorSubject(<number>0);
	public _nilaiRek = this.niliaRek.asObservable();
  constructor(private http: HttpClient) { }
  gets(Idspd: number) : Observable<ISpddetb[]>{
    const param = new HttpParams()
      .set('Idspd', Idspd.toString());
    return this.http.get<ISpddetb[]>(`${environment.url}Spddetb`, {params: param})
      .pipe(map(resp => <ISpddetb[]>resp))
  }
  getsTotalNilai(Idunit: number, Idspd: number){
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idspd', Idspd.toString());
    return this.http.get(`${environment.url}Spddetb/total-nilai`, {params: param})
      .pipe(map(resp => <any>resp))
  }
  setRekSelected(data: ISpddetb): void{
    this.rekSelected.next(data);
  }
  setNilaiRek(data: number): void{
		this.niliaRek.next(data);
	}
}
