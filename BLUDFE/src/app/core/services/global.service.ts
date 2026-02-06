import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private title = new BehaviorSubject(<string>null);
  public _title = this.title.asObservable();
  constructor(private http: HttpClient) { }
  backupDatabase(){
    return this.http.get(`${environment.url}BackupDatabase`,{observe: 'response', responseType: 'blob' as 'json' });
  }
  setTitle(e: string) : void{
    this.title.next(e);
  }
}
