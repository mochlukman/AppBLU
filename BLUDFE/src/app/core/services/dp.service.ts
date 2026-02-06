import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DpService {
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
  private Idxkode: number;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  private Idttd: number;
  set _idttd(e: number){
    this.Idttd = e;
  }
  constructor(private http: HttpClient) { }
  generateNo(){
    return this.http.get(`${environment.url}Dp/GenerateNo`).pipe(map(resp => <any>resp));
  }
  gets(){
    const queryParams = new HttpParams()
      .set('Start', this.Start.toString())
      .set('Rows', this.Rows.toString())
      .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
      .set('SortField', this.SortField ? this.SortField : '')
      .set('SortOrder', this.SortOrder ? this.SortOrder.toString() : '0')
      .set('Parameters.Idxkode', this.Idxkode ? this.Idxkode.toString() : '0')
      .set('Parameters.Idttd', this.Idttd ? this.Idttd.toString() : '0');
    return this.http.get<any>(`${environment.url}Dp`, {params: queryParams}).pipe(map(resp => <any>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Dp`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Dp`, postBody, {observe: 'response'});
  }
  delete(Iddp: number){
    return this.http.request('DELETE', `${environment.url}Dp/${Iddp}`, {observe: 'response'});
  }
  kirim(Iddp: number){
    return new Observable(resp => resp);
  }
}
