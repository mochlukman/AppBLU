import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DaftreklakService {

  constructor(private http: HttpClient) { }
  gets(params?: any) {
    return this.http.get<any[]>(`${environment.url}Daftreklak`,{params: params})
      .pipe(map(resp => <any[]>resp));
  }
  updateNilai(paramBody: any){
    return this.http.put(`${environment.url}Daftreklak/update-nilai`, paramBody, {observe: 'response'});
  }

}
