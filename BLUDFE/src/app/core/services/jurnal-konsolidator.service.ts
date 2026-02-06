import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JurnalKonsolidatorService {

  constructor(private http: HttpClient) { }
  konsPendapatan(Idunit: string, Tgl1: string, Tgl2: string) : Observable<any[]>{
    const queryParam = new HttpParams()
      .set('Nobbantu', Idunit)
      .set('Tgl1', Tgl1)
      .set('Tgl2', Tgl2);
      return this.http.get<any[]>(`${environment.url}JurnalKonsolidator/Pendapatan`, {params: queryParam})
        .pipe(map(resp => <any[]>resp));
  }
  konsPengenluaran(Idunit: string, Tgl1: string, Tgl2: string) : Observable<any[]>{
    const queryParam = new HttpParams()
      .set('Nobbantu', Idunit)
      .set('Tgl1', Tgl1)
      .set('Tgl2', Tgl2);
      return this.http.get<any[]>(`${environment.url}JurnalKonsolidator/Pengeluaran`, {params: queryParam})
        .pipe(map(resp => <any[]>resp));
  }
  ayatAyat(Jenis: string, Nobukti: string, JnsJurnal: number) : Observable<any[]>{
    const queryParam = new HttpParams()
      .set('Jenis', Jenis)
      .set('Nobukti', Nobukti)
      .set('JenisJurnal', JnsJurnal.toString());
      return this.http.get<any[]>(`${environment.url}JurnalKonsolidator/ayat-ayat`, {params: queryParam})
        .pipe(map(resp => <any[]>resp));
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}JurnalKonsolidator/Update-Valid`, paramBody, {observe: 'response'});
  }
}
