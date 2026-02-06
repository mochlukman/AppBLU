import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MappingUtangPiutangService {

  constructor(private http: HttpClient) { }
  gets(idjnsakun: string, idreklo: number):Observable<any[]>{
    const queryParam = new HttpParams()
    .set('idjnsakun', idjnsakun)
    .set('idreklo', idreklo.toString());
    return this.http.get<any[]>(`${environment.url}MappingUtangPiutang`, {params: queryParam}).pipe(map(resp => <any[]>resp));
  }
  post(postbody: any){
    return this.http.post(`${environment.url}MappingUtangPiutang`, postbody, {observe: 'response'});
  }
  delete(idjnsakun: string, idsetuplo: number){
    return this.http.request('DELETE', `${environment.url}MappingUtangPiutang/${idjnsakun}/${idsetuplo}`, {observe: 'response'});
  }
}
