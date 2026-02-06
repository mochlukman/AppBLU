import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { IReportParameter } from '../interface/ireport-parameter';

@Injectable({
	providedIn: 'root'
})
export class ReportService {
	private dprdSelected = new BehaviorSubject([]);
	public _dprdSelected = this.dprdSelected.asObservable();
	constructor(private http: HttpClient) {}
	setSelectedDprd(data: any) {
		return this.dprdSelected.next(data);
	}
	execPrint(param: IReportParameter) {
		const params = {
			reportName: param.FileName,
			formatType: param.Type,
			parameters: param.Params
		};
    const url = environment.btb ? `${environment.url}Report` : `${environment.urlReport}`
		return this.http.post(`${url}`, params, { responseType: 'blob' });
	}
	extractData(res: any, type: number, filename: string) {
		const fileType =
			type === 1 ? 'application/pdf' : type === 2 ? 'application/msword' : 'application/vnd.ms-excel';
		const extention = type === 1 ? '.pdf' : type === 2 ? '.doc' : '.xls';
		const fileName = filename.replace('.rpt', '') + extention;
		const myBlob: Blob = new Blob([ res ], { type: fileType });
		const fileURL = URL.createObjectURL(myBlob);
		const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
		if (type === 1) {
			window.open(fileURL);
		}
		a.href = fileURL;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(fileURL);
		// window.open(fileURL);
	}
}
