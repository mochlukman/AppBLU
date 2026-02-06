import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJnsakun } from '../interface/ijnsakun';

@Injectable({
  providedIn: 'root'
})
export class JnsakunService {
  private Idjnsakun: string; // pisah dengan koma jika lebih dari satu
  set _idjnsakun(e: string){
    this.Idjnsakun = e;
  }
  constructor(private http: HttpClient) { }
  getByListId(){
    const qp = new HttpParams()
    .set('Idjnsakun', this.Idjnsakun ? this.Idjnsakun : 'x');
    return this.http.get<IJnsakun[]>(`${environment.url}Jnsakun/byListId`, {params: qp}).pipe(map(resp => <IJnsakun[]>resp));
  }
}
