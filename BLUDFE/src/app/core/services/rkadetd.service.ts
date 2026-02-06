import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RkadetdService {
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
  private Idrkad: number;
  set _idrkad(e: number){
    this.Idrkad = e;
  }
  constructor(private http: HttpClient) { }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Idrkad', this.Idrkad ? this.Idrkad.toString() : '0');
    return this.http.get(`${environment.url}Rkadetd/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  post(postBody: any){
    return this.http.post(`${environment.url}Rkadetd`, postBody, {observe: 'response'});
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Rkadetd`, postBody, {observe: 'response'});
  }
  delete(Idrkadetd: number){
    return this.http.request('DELETE', `${environment.url}Rkadetd/${Idrkadetd}`, {observe: 'response'});
  }
}
