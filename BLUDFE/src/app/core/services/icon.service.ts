import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IIcons } from '../interface/iicons';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private http: HttpClient) { }
  get(){
    return this.http.get(`${environment.url}Icons`).pipe(map(resp => <IIcons[]>resp));
  }
}
