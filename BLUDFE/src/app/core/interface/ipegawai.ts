import { IGolongan } from './igolongan';
import { IDaftunit } from './idaftunit';
export interface IPegawai {
	idpeg: number;
	nip: string;
	idunit: number;
	kdgol: string;
	nama: string;
	alamat: string;
	jabatan: string;
	pddk: string;
	npwp: string;
	staktif: boolean;
	stvalid: boolean;
	Datecreate: null;
	Dateupdate: null;
	updatetime: null;
	kdgolNavigation: IGolongan;
	IdunitNavigation: IDaftunit;
}