import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJbkas } from '../interface/ijbkas';

@Injectable({
  providedIn: 'root'
})
export class JbkasService {

  constructor(private http: HttpClient) { }
  gets(): Observable<IJbkas[]>{
    return this.http.get<IJbkas[]>(`${environment.url}Jbkas`).pipe(map(resp => <IJbkas[]>resp));
  }
}
