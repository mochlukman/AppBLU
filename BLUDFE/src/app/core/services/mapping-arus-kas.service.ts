import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MappingArusKasService {

  constructor(private http: HttpClient) { }
  gets(idjnslak: string, idreklak: number):Observable<any[]>{
    const queryParam = new HttpParams()
    .set('idjnslak', idjnslak)
    .set('idreklak', idreklak.toString());
    return this.http.get<any[]>(`${environment.url}MappingLak`, {params: queryParam}).pipe(map(resp => <any[]>resp));
  }
  post(postbody: any){
    return this.http.post(`${environment.url}MappingLak`, postbody, {observe: 'response'});
  }
  delete(idjnslak: string, idsetlak : number){
    return this.http.request('DELETE', `${environment.url}MappingLak/${idjnslak}/${idsetlak}`, {observe: 'response'});
  }
}
