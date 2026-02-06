import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITagihandet } from '../interface/itagihan';

@Injectable({
  providedIn: 'root'
})
export class TagihandetService {
  constructor(private http: HttpClient) { }
  gets(Idtagihan: number): Observable<ITagihandet[]>{
    const param = new HttpParams()
      .set('Idtagihan', Idtagihan.toString());
    return this.http.get<ITagihandet[]>(`${environment.url}Tagihandet`,{params: param})
      .pipe(map(resp => <ITagihandet[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Tagihandet`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Tagihandet`, paramBody, {observe: 'response'});
  }
  delete(Idtagihandet: number){
    return this.http.request('DELETE',`${environment.url}Tagihandet/${Idtagihandet}`, {observe: 'response'});
  }
}
