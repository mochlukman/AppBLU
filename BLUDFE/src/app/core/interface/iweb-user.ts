import { IDaftunit } from './idaftunit';
import { IWEbGroup } from './iweb-group';
import { IJenisunit } from './ijenisunit';
import { IPegawai } from './ipegawai';

export interface IWebUser {
	userid : string;
	idunit : number;
	kdtahap : string;
	idpeg : number;
	groupid : number;
	nama : string;
	email : string;
	blokid : number;
	transecure : boolean;
	stmaker : boolean;
	stchecker : boolean;
	staproval : boolean;
	stlegitimator : boolean;
	stinsert : boolean;
	stupdate : boolean;
	stdelete : boolean;
	ket : string;
	isauthorized : boolean;
	authorizedby : string;
	authorizeddate : null;
	group : IWEbGroup;
	idpegNavigation : IPegawai;
	idunitNavigation : IDaftunit;
	otorisasi: string;
	disetujui: string;
}