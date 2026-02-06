import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SshService {
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
  private Kelompok: string;
  set _kelompok(e: string){
    this.Kelompok = e;
  }
  constructor(private http: HttpClient) { }

  get(idssh: number){
    return this.http.get<any>(`${environment.url}Ssh/${idssh}`).pipe(map(resp => <any>resp));
  }
  gets(kelompok: string, Idrek: number){
    const qp = new HttpParams()
    .set('Kelompok', kelompok)
    .set('Idrek', Idrek ? Idrek.toString() : '0');
    return this.http.get<any[]>(`${environment.url}Ssh`, {params: qp}).pipe(map(resp => <any[]>resp));
  }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Kelompok', this.Kelompok ? this.Kelompok : 'x');
    return this.http.get(`${environment.url}Ssh/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Ssh`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}Ssh`, paramBody, {observe: 'response'});
  }
  delete(idssh: number){
    return this.http.request('DELETE', `${environment.url}Ssh/${idssh}`, {observe: 'response'});
  }
}
