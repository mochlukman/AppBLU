import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDpablnb } from '../interface/idpablnb';

@Injectable({
  providedIn: 'root'
})
export class DpablnbService {
  constructor(private http: HttpClient) { }
  gets(Iddpab: number) : Observable<IDpablnb[]>{
    const param = new HttpParams().set('Iddpab', Iddpab.toString());
    return this.http.get<IDpablnb[]>(`${environment.url}Dpablnb`, {params: param})
      .pipe(map(resp => <IDpablnb[]>resp))
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Dpablnb`, paramBody, {observe:'response'});
  }
}
