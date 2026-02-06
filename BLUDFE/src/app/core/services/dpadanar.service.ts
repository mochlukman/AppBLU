import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDpadanar } from '../interface/idpadanar';

@Injectable({
  providedIn: 'root'
})
export class DpadanarService {
  constructor(private http: HttpClient) { }
  gets(Iddpar: number) : Observable<IDpadanar[]>{
    const param = new HttpParams().set('Iddpar', Iddpar.toString());
    return this.http.get<IDpadanar[]>(`${environment.url}Dpadanar`, {params: param})
      .pipe(map(resp => <IDpadanar[]>resp))
  }
  get(Iddpadanar: number) : Observable<IDpadanar>{
    return this.http.get<IDpadanar>(`${environment.url}Dpadanar/${Iddpadanar}`)
      .pipe(map(resp => <IDpadanar>resp))
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Dpadanar`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
      return this.http.put(`${environment.url}Dpadanar`, paramBody, { observe: 'response'});
  }
  delete(Iddpadanar: number){
    return this.http.request('DELETE', `${environment.url}Dpadanar/${Iddpadanar}`, {
      observe: 'response'
    });
  }
}
