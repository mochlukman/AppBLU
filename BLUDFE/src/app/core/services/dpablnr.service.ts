import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDpablnr } from '../interface/idpablnr';

@Injectable({
  providedIn: 'root'
})
export class DpablnrService {
  constructor(private http: HttpClient) { }
  gets(Iddpar: number) : Observable<IDpablnr[]>{
    const param = new HttpParams().set('Iddpar', Iddpar.toString());
    return this.http.get<IDpablnr[]>(`${environment.url}Dpablnr`, {params: param})
      .pipe(map(resp => <IDpablnr[]>resp))
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Dpablnr`, paramBody, {observe:'response'});
  }
}
