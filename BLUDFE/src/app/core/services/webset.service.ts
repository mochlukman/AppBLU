import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IWebset } from '../interface/iwebset';

@Injectable({
  providedIn: 'root'
})
export class WebsetService {
  constructor(private http: HttpClient) { }
  byKdset(kdset: string){
    const qp = new HttpParams().set('Kdset', kdset);
    return this.http.get<IWebset>(`${environment.url}Webset/bykdset`, {params: qp}).pipe(map(resp => <IWebset>resp));
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Webset`, postBody, {observe: 'response'});
  }
}
