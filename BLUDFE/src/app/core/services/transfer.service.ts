import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TransferService {
	url: string = environment.url + 'Transfer/';
	constructor(private http: HttpClient) {}
	toEvaluasiMusrenbangDesa(paramBody: any) {
		const request = new HttpRequest('POST', `${this.url}to-evaluasi-musrenbang-desa`, paramBody, {
			reportProgress: true
		});
		return this.http.request(request);
	}
	toMusrenbangKecamatan(paramBody: any) {
		const request = new HttpRequest('POST', `${this.url}to-musrenbang-kecamatan`, paramBody, {
			reportProgress: true
		});
		return this.http.request(request);
	}
	toEvaluasiMusrenbangKecamatan(paramBody: any) {
		const request = new HttpRequest('POST', `${this.url}to-evaluasi-musrenbang-kecamatan`, paramBody, {
			reportProgress: true
		});
		return this.http.request(request);
	}
	toEvaluasiPokir(paramBody: any) {
		const request = new HttpRequest('POST', `${this.url}to-evaluasi-pokir`, paramBody, {
			reportProgress: true
		});
		return this.http.request(request);
	}
	rkaukKeRka(paramBody: any){
		const parameters = {
			parameters: paramBody
		};
		const request = new HttpRequest('POST', `${this.url}rkauk-ke-rka`, parameters, {
			reportProgress: true
		});
		return this.http.request(request);
	}
}
