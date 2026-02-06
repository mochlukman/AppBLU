import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MappingAssetUtangService {

  constructor(private http: HttpClient) { }
  gets(Idrekaset: number):Observable<any[]>{
    const queryParam = new HttpParams()
    .set('Idrekaset', Idrekaset.toString());
    return this.http.get<any[]>(`${environment.url}MappingAsetUtang`, {params: queryParam}).pipe(map(resp => <any[]>resp));
  }
  post(postbody: any){
    return this.http.post(`${environment.url}MappingAsetUtang`, postbody, {observe: 'response'});
  }
  delete(Idrekaset: number){
    return this.http.request('DELETE', `${environment.url}MappingAsetUtang/${Idrekaset}`, {observe: 'response'});
  }
}
