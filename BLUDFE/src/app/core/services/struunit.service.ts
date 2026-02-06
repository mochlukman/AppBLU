import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IStruunit } from '../interface/istruunit';

@Injectable({
  providedIn: 'root'
})
export class StruunitService {

  constructor(private http: HttpClient) { }
  get(): Observable<IStruunit[]>{
    return this.http.get<IStruunit[]>(`${environment.url}Struunit`).pipe(map(resp => <IStruunit[]>resp));
  }
}
