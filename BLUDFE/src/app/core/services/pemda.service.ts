import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PemdaService {

  constructor(private http: HttpClient) { }
  get(configid: string){
    const param = new HttpParams()
    .set('Keyset', configid ? configid : '')
    return this.http.get<any>(`${environment.url}Pemda/get_config`, {params: param}).pipe(map(resp => <any>resp));
  }
}
