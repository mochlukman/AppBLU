import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StsdetrService {
  constructor(private http: HttpClient) { }
  gets(Idsts: number) : Observable<any[]>{
    const param = new HttpParams()
      .set('Idsts', Idsts.toString());
    return this.http.get<any[]>(`${environment.url}Stsdetr`, {params: param})
      .pipe(map(resp => <any[]>resp));
  }
  get(Idstsdetr:number) : Observable<any>{
    return this.http.get(`${environment.url}Stsdetr/${Idstsdetr}`)
      .pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Stsdetr`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Stsdetr`, paramBody, {observe: 'response'});
  }
  delete(Idstsdetr:number){
    return this.http.request('DELETE', `${environment.url}Stsdetr/${Idstsdetr}`, {observe: 'response'});
  }
}
