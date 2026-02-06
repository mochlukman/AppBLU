import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ILog } from '../interface/ILog';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private http: HttpClient) { }
  get(tgl: string){
    const queryParam = new HttpParams()
      .set('tgl', tgl)
    return this.http.get<ILog[]>(`${environment.url}IFLogger`, {params: queryParam}).pipe(map(resp => <ILog[]>resp));
  }
}
