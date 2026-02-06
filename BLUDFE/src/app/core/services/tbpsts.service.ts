import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITbpsts } from '../interface/itbpsts';

@Injectable({
  providedIn: 'root'
})
export class TbpstsService {

  constructor(private http: HttpClient) { }
  byTbp(Idtbp: number) : Observable<ITbpsts[]>{
    return this.http.get(`${environment.url}Tbpsts/by-tbp/${Idtbp}`).pipe(map(resp => <ITbpsts[]>resp));
  }
  bySts(Idsts: number) : Observable<ITbpsts[]>{
    return this.http.get(`${environment.url}Tbpsts/by-sts/${Idsts}`).pipe(map(resp => <ITbpsts[]>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Tbpsts`, paramBody, {observe: 'response'});
  }
  delete(Idtbp: number, Idsts: number){
    const query = new HttpParams()
      .set('Idtbp', Idtbp.toString())
      .set('Idsts', Idsts.toString());
    return this.http.request('DELETE', `${environment.url}Tbpsts`, {
      params: query,
      observe: 'response'
    });
  }
}
