import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IKontrakdetr } from '../interface/ikontrak';

@Injectable({
  providedIn: 'root'
})
export class KontrakdetrService {

  constructor(private http: HttpClient) { }
  gets(Idkontrak: number): Observable<IKontrakdetr[]>{
    const param = new HttpParams()
      .set('Idkontrak', Idkontrak.toString());
    return this.http.get<IKontrakdetr[]>(`${environment.url}Kontrakdetr`,{params: param})
      .pipe(map(resp => <IKontrakdetr[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Kontrakdetr`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Kontrakdetr`, paramBody, {observe: 'response'});
  }
  delete(Iddetkontrak: number){
    return this.http.request('DELETE',`${environment.url}Kontrakdetr/${Iddetkontrak}`, {observe: 'response'});
  }
}
