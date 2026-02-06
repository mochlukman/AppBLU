import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDpablnd } from '../interface/idpablnd';

@Injectable({
  providedIn: 'root'
})
export class DpablndService {
  constructor(private http: HttpClient) { }
  gets(Iddpad: number) : Observable<IDpablnd[]>{
    const param = new HttpParams().set('Iddpad', Iddpad.toString());
    return this.http.get<IDpablnd[]>(`${environment.url}Dpablnd`, {params: param})
      .pipe(map(resp => <IDpablnd[]>resp))
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Dpablnd`, paramBody, {observe:'response'});
  }
}
