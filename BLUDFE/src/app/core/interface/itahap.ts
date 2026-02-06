export interface ITahap {
	kdtahap : string;
	uraian : string;
	nmtahap : string;
	startDate : null;
	endDate : null;
	ket : string;
	tgltransfer : null;
	lock: boolean;
}
export interface ITahapTL {
	kdtahap: string;
	nmtahap: string;
	ket: string;
	startDate: string;
	endDate: string;
	createdby: null;
	createddate: null;
	updateby: null;
	updatetime: null;
	lock: boolean;
	summary: any;
}