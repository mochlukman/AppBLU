import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JurnalKasService {

  constructor(private http: HttpClient) { }
  put(paramBody: any){
    return this.http.put(`${environment.url}JurnalKas/Update-Valid`, paramBody, {observe: 'response'});
  }
  detail(Idunit: number, Jenis: null, Nobukti: string) : Observable<any[]>{
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Jenis', Jenis)
      .set('Nobukti', Nobukti);
      return this.http.get<any[]>(`${environment.url}JurnalKas/Detail`, {params: queryParam})
        .pipe(map(resp => <any[]>resp));
  }
  ayatAyat(Idunit: number, Jenis: string, Nobukti: string, JnsJurnal: number) : Observable<any[]>{
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Jenis', Jenis)
      .set('Nobukti', Nobukti)
      .set('JenisJurnal', JnsJurnal.toString());
      return this.http.get<any[]>(`${environment.url}JurnalKas/ayat-ayat`, {params: queryParam})
        .pipe(map(resp => <any[]>resp));
  }
  rincianJurnal(Idunit: number, Nobukti: string) : Observable<any[]>{
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Nobukti', Nobukti);
      return this.http.get<any[]>(`${environment.url}JurnalKas/rincian-jurnal`, {params: queryParam})
        .pipe(map(resp => <any[]>resp));
  }
  jurnalSkpd(Idunit: number, Idbend: number, Jenis: null, Tgl1: string, Tgl2: string) : Observable<any[]>{
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idbend', Idbend.toString())
      .set('Jenis', Jenis)
      .set('Tgl1', Tgl1)
      .set('Tgl2', Tgl2);
      return this.http.get<any[]>(`${environment.url}JurnalKas/jurnal-skpd`, {params: queryParam})
        .pipe(map(resp => <any[]>resp));
  }
  jurnalSkpdNew(Idunit: number, Jenis: null, Tgl1: string, Tgl2: string, JurnalType: string) : Observable<any[]>{
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('JurnalType', JurnalType)
      .set('Jenis', Jenis)
      .set('Tgl1', Tgl1)
      .set('Tgl2', Tgl2);
      return this.http.get<any[]>(`${environment.url}JurnalKas/jurnal-skpd-new`, {params: queryParam})
        .pipe(map(resp => <any[]>resp));
  }
}
