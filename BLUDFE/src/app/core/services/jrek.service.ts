import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJrek } from '../interface/ijrek';

@Injectable({
  providedIn: 'root'
})
export class JrekService {

  constructor(private http: HttpClient) { }
  gets() : Observable<IJrek[]>{
    return this.http.get<IJrek[]>(`${environment.url}Jrek`).pipe(map(resp => <IJrek[]>resp));
  }
}
