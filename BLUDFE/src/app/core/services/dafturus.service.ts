import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDafturus } from '../interface/idafturus';
import { IPegawai } from '../interface/ipegawai';

@Injectable({
  providedIn: 'root'
})
export class DafturusService {
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
  private Kdurus: string;
  set _kdurus(e: string){
    this.Kdurus = e;
  }
  private Nmurus: string;
  set _nmurus(e: string){
    this.Nmurus = e; 
  }
  private Kdlevel: string; // pisahkan dengan koma(,)  jika lebih dari 1
  set _kdlevel(e: string){
    this.Kdlevel = e;
  }
  private Type: string;
  set _type(e: string){
    this.Type = e;
  }
  constructor(private http: HttpClient) { }
  paging(){
    const qp = new HttpParams()
    .set('Start', this.Start.toString())
    .set('Rows', this.Rows.toString())
    .set('GlobalFilter', this.GlobalFilter ? this.GlobalFilter : '')
    .set('SortField', this.SortField ? this.SortField : '')
    .set('SortOrder', this.SortOrder.toString())
    .set('Parameters.Kdurus', this.Kdurus ? this.Kdurus.toString() : 'x')
    .set('Parameters.Nmurus', this.Nmurus ? this.Nmurus.toString() : 'x')
    .set('Parameters.Kdlevel', this.Kdlevel ? this.Kdlevel.toString() : '0')
    .set('Parameters.Type', this.Type ? this.Type.toString() : 'x');
    return this.http.get(`${environment.url}Dafturus/paging`,{params: qp}).pipe(map(resp => <any>resp));
  }
  gets(): Observable<IDafturus[]>{
    const param = new HttpParams()
    .set('Kdurus', this.Kdurus ? this.Kdurus.toString() : 'x')
    .set('Nmurus', this.Nmurus ? this.Nmurus.toString() : 'x')
    .set('Kdlevel', this.Kdlevel ? this.Kdlevel.toString() : '0')
    .set('Type', this.Type ? this.Type.toString() : 'x');
    return this.http.get<IDafturus[]>(`${environment.url}Dafturus`, {params: param}).pipe(map(resp => <IDafturus[]>resp));
  }
  put(postBody: any){
    return this.http.put(`${environment.url}Dafturus`, postBody, {observe: 'response'});
  }
}
