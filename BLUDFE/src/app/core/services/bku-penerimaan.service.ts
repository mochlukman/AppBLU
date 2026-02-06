import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBkuPenerimaan } from '../interface/ibku';

@Injectable({
  providedIn: 'root'
})
export class BkuPenerimaanService {
  constructor(private http: HttpClient) { }
  generateNoBku(Idunit: number, Idbend: number){
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idbend', Idbend.toString());
    return this.http.get(`${environment.url}BkuPenerimaan/GenerateNoBku`,{params: queryParam}).pipe(map(resp => <any>resp));
  }
  gets(Idunit: number, Idbend: number, Jenis: null, Tgl1: string, Tgl2: string) : Observable<IBkuPenerimaan[]>{
    const queryParam = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idbend', Idbend.toString())
      .set('Jenis', Jenis)
      .set('Tgl1', Tgl1)
      .set('Tgl2', Tgl2);
      return this.http.get<IBkuPenerimaan[]>(`${environment.url}BkuPenerimaan`, {params: queryParam})
        .pipe(map(resp => <IBkuPenerimaan[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}BkuPenerimaan`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){}
  delete(Nobku: string, Jenis: string){
    const queryParam = new HttpParams()
      .set('Nobku', Nobku)
      .set('Jenis', Jenis);
    return this.http.request('DELETE',`${environment.url}BkuPenerimaan`, {params: queryParam, observe: 'response'});
  }
}
