import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILookupTree } from '../interface/iglobal';

@Injectable({
  providedIn: 'root'
})
export class DpaKegiatanService {

  constructor(private http: HttpClient) { }
  tree(Idunit: number, Kdtahap: string, Header?:boolean, JnsKeg?: number) : Observable<ILookupTree[]>{
    const param = new HttpParams()
    .set('Idunit', Idunit.toString())
    .set('Kdtahap', Kdtahap)
    .set('Header', Header ? 'true' : 'false')
    .set('JnsKeg', JnsKeg ? JnsKeg.toString() : '0');
    return this.http.get<ILookupTree[]>(`${environment.url}Dpakegiatan/tree`, {params: param})
      .pipe(map(resp => <ILookupTree[]>resp));
  }
}
