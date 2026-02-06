import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExecutesService {
  private Spname: string;
  set _spname(e: string){
    this.Spname = e;
  }
  private Kdtahap: string;
  set _kdtahap(e: string){
    this.Kdtahap = e;
  }
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  constructor(private http: HttpClient) { }
  gets() : Observable<any[]>{
    const qp = new HttpParams()
      .set('Spname', this.Spname ? this.Spname.trim() : 'x')
      .set('Kdtahap', this.Kdtahap ? this.Kdtahap.trim() : 'x')
      .set('Idunit', this.Idunit ? this.Idunit.toString() : '0');
    return this.http.get<any[]>(`${environment.url}Exceute`, {params: qp}).pipe(map(resp => <any[]>resp));
  }
}
