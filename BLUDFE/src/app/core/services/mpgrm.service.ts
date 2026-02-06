import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILookupTree2 } from '../interface/iglobal';

@Injectable({
  providedIn: 'root'
})
export class MpgrmService {
  private Start: number;
  set _start(e: number) {
    this.Start = e;
  }
  private Rows: number;
  set _rows(e: number) {
    this.Rows = e;
  }
  private GlobalFilter: string = '';
  set _globalFilter(e: string) {
    this.GlobalFilter = e;
  }
  private SortField: string = '';
  set _sortField(e: string) {
    this.SortField = e;
  }
  private SortOrder: number;
  set _sortOrder(e: number) {
    this.SortOrder = e;
  }
  private Idurus: number;
  set _idurus(e: number) {
    this.Idurus = e;
  }
  constructor(private http: HttpClient) { }
  tree(): Observable<ILookupTree2[]> {
    const qp = new HttpParams()
      .set('Idurus', this.Idurus ? this.Idurus.toString() : '0');
    return this.http.get<ILookupTree2[]>(`${environment.url}Mpgrm/tree-view`, { params: qp }).pipe(map(resp => <ILookupTree2[]>resp));
  }
  paging() {
    const qp = new HttpParams()
      .set('Start', this.Start.toString())
      .set('Rows', this.Rows.toString())
      .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
      .set('SortField', this.SortField ? this.SortField : '')
      .set('SortOrder', this.SortOrder.toString())
      .set('Parameters.Idurus', this.Idurus ? this.Idurus.toString() : '0');
    return this.http.get(`${environment.url}Mpgrm/paging`, { params: qp }).pipe(map(resp => <any>resp));
  }
  post(postBody: any) {
    return this.http.post(`${environment.url}Mpgrm`, postBody, {observe: 'response'});
  }
  put(postBody: any) {
    return this.http.put(`${environment.url}Mpgrm`, postBody, {observe: 'response'});
  }
  delete(idprgrm: number) {
    return this.http.request('DELETE', `${environment.url}Mpgrm/${idprgrm}`, {observe: 'response'});
  }
}
