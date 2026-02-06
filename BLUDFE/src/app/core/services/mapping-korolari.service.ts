import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MappingKorolariService {

  constructor(private http: HttpClient) { }
  gets(Idrek: number):Observable<any[]>{
    const queryParam = new HttpParams()
    .set('Idrek', Idrek.toString());
    return this.http.get<any[]>(`${environment.url}MappingKorolari`, {params: queryParam}).pipe(map(resp => <any[]>resp));
  }
  post(postbody: any){
    return this.http.post(`${environment.url}MappingKorolari`, postbody, {observe: 'response'});
  }
  delete(Idkorolari: number){
    return this.http.request('DELETE', `${environment.url}MappingKorolari/${Idkorolari}`, {observe: 'response'});
  }
}
