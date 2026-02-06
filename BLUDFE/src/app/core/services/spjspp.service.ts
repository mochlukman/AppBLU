import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpjspp } from '../interface/ispjspp';

@Injectable({
  providedIn: 'root'
})
export class SpjsppService {

  constructor(private http: HttpClient) { }
  getBySpp(Idspp: number, Kdstatus: string): Observable<ISpjspp[]>{
    const param = new HttpParams()
      .set('Idspp', Idspp.toString())
      .set('Kdstatus', Kdstatus);
    return this.http.get<ISpjspp[]>(`${environment.url}Spjspp/by-spp`, {params: param})
      .pipe(map(resp => <ISpjspp[]>resp));
  }
  postFromSpp(paramBody: any){
    return this.http.post(`${environment.url}Spjspp/from-spp`, paramBody, {observe: 'response'});
  }
  postFromSppBatch(paramBody: any){
    return this.http.post(`${environment.url}Spjspp/from-spp/batch`, paramBody, {observe: 'response'});
  }
  delete(idsppspj: number){
    return this.http.request('DELETE', `${environment.url}Spjspp/${idsppspj}`, {observe: 'response'});
  }
}
