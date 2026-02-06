import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DaftarBarangService {
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
  private Kdbrg: string;
  set _kdbrg(e: string){
    this.Kdbrg = e;
  }
  constructor(private http: HttpClient) { }
  gets() : Observable<any[]>{
    const qp = new HttpParams()
    .set('Kdbrg', this.Kdbrg ? this.Kdbrg : 'x');
    return this.http.get<any[]>(`${environment.url}Daftbarang`, {params : qp}).pipe(map(resp => <any[]>resp));
  }
  get(idgol: number){
    return this.http.get<any>(`${environment.url}Daftbarang/${idgol}`).pipe(map(resp => <any>resp));
  }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder ? this.SortOrder.toString() : '0')
    .set('Parameters.Kdbrg', this.Kdbrg ? this.Kdbrg : 'x');
    return this.http.get(`${environment.url}Daftbarang/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
}
