import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IKontrak } from '../interface/ikontrak';

@Injectable({
  providedIn: 'root'
})
export class KontrakService {
  private kontrakSelected = new BehaviorSubject(<IKontrak>null);
  public _kontrakSelected = this.kontrakSelected.asObservable();
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
  private Idkeg: number;
  set _idkeg(e: number){
    this.Idkeg = e;
  }
  private Idphk3: number;
  set _idphk3(e: number){
    this.Idphk3 = e;
  }
  constructor(private http: HttpClient) { }
  setKontrakSelected(data: IKontrak):void{
    this.kontrakSelected.next(data);
  }

  resetProperty(){
    this.Idunit = undefined;
    this.Idkeg = undefined;
    this.Idphk3 = undefined;
  }
   paging(params: any){
    return this.http.get(`${environment.url}Kontrak/paging/list`,{params: params}).pipe(map(resp => <any>resp));
  }
  gets(Idunit: number, Idkeg?:number): Observable<IKontrak[]>{
    const param = new HttpParams()
      .set('Idunit', Idunit.toString())
      .set('Idkeg', Idkeg ? Idkeg.toString() : '0');
    return this.http.get<IKontrak[]>(`${environment.url}Kontrak/list`, {params: param})
      .pipe(map(resp => <IKontrak[]>resp));
  }
  
  /*gets(): Observable<IKontrak[]>{ 
      const param = new HttpParams()
        .set('Idunit', this.Idunit.toString())
        .set('Idkeg', this.Idkeg.toString());
      return this.http.get<IKontrak[]>(`${environment.url}Kontrak`, {params: param})
        .pipe(map(resp => {
          this.resetProperty();
          return <IKontrak[]>resp;
        }));
    }*/
  
  get(Idkontrak: number){
    return this.http.get<IKontrak>(`${environment.url}kontrak/${Idkontrak}`).pipe(map(resp => <IKontrak>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}kontrak`, paramBody, {observe: 'response'});
  }
  put(paramBody: any){
    return this.http.put(`${environment.url}kontrak`, paramBody, {observe: 'response'});
  }
  delete(Idkontrak: number){
    return this.http.request('DELETE', `${environment.url}Kontrak/${Idkontrak}`,{observe: 'response'});
  }
}
