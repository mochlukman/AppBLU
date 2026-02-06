import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RkatapddService {
  private Start: number;
  set _start(e: number){
    this.Start = e;
  }
  private Rows: number;
  set _rows(e: number){
    this.Rows = e;
  }
  private GlobalFilter: string = '';
  set _globalFilter(e: string){
    this.GlobalFilter = e;
  }
  private SortField: string = '';
  set _sortField(e: string){
    this.SortField = e;
  }
  private SortOrder: number;
  set _sortOrder(e: number){
    this.SortOrder = e;
  }
  private Idtapd: number;
  set _idtapd(e: number){
    this.Idtapd = e;
  }
  private Idrka: number;
  set _idrka(e: number){
    this.Idrka = e;
  }
  private Idpeg: number;
  set _idpeg(e: number){
    this.Idpeg = e;
  }
  private Nomor: string;
  set _nomor(e: string){
    this.Nomor = e;
  }
  constructor(private http: HttpClient) { }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Idtapd', this.Idtapd ? this.Idtapd.toString() : '0')
    .set('Parameters.Idrka', this.Idrka ? this.Idrka.toString() : '0')
    .set('Parameters.Idpeg', this.Idpeg ? this.Idpeg.toString() : '0')
    .set('Parameters.Nomor', this.Nomor ? this.Nomor : 'x');
    return this.http.get(`${environment.url}Rkatapdd/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  getNomor(idrka: number){
    return this.http.get(`${environment.url}Rkatapdd/nomor/${idrka}`).pipe(map(resp => <any>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Rkatapdd`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Rkatapdd`, postBody, {observe: 'response'});
  }
  delete(Idtapd: number){
    return this.http.request('DELETE', `${environment.url}Rkatapdd/${Idtapd}`, {observe: 'response'});
  }
}
