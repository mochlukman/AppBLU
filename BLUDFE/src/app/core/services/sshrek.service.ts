import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SshrekService {

  constructor(private http: HttpClient) { }
  gets(idssh:number) {
    const qp = new HttpParams()
    .set('Idssh', idssh.toString());
    return this.http.get<any>(`${environment.url}Sshrek`, {params: qp}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Sshrek`, paramBody, {observe:'response'});
  }
  delete(idsshrek:number) {
    return this.http.request('DELETE', `${environment.url}Sshrek/${idsshrek}`, {observe: 'response'});
  }
}
