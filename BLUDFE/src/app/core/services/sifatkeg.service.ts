import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Isifatkeg } from '../interface/isifatkeg';

@Injectable({
  providedIn: 'root'
})
export class SifatkegService {

  constructor(private http: HttpClient) { }
  gets(): Observable<Isifatkeg[]>{
    return this.http.get<Isifatkeg[]>(`${environment.url}Sifatkeg`).pipe(map(resp => <Isifatkeg[]>resp));
  }
}
