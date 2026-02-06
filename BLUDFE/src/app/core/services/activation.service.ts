import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAdendum} from 'src/app/core/interface/iadendum';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivationService {

  constructor(private http: HttpClient) { }
  getCPUID(){
    return this.http.get<IAdendum>(`${environment.url}Activate/GetCPUID`).pipe(map(resp => <any>resp));
  }
  post(paramBody: any){
    return this.http.post(`${environment.url}Activate`, paramBody, {observe: 'response'});
  }
}
