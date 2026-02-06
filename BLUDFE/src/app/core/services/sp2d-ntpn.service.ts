import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Sp2dNtpnService {
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
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  constructor(private http: HttpClient) { }
  resetProperty(){
    this.Idunit = undefined;
  }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder ? this.SortOrder.toString() : '0')
    .set('Parameters.Idunit', this.Idunit ? this.Idunit.toString() : '0');
    return this.http.get(`${environment.url}Sp2dNtpn/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Sp2dNtpn`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Sp2dNtpn`, paramBody, {observe: 'response'});
  }
  delete(Idntpn: number){
    return this.http.request('DELETE',`${environment.url}Sp2dNtpn/${Idntpn}`, {observe: 'response'});
  }
}
