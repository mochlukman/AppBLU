import { IPegawai } from './ipegawai';
import { IRkab } from './irkab';

export interface IRkatapdb {
  idtapdb : number;
  idrkab : number;
  idpeg : number;
  nippeg : string;
  namapeg : string;
  nomor : string;
  verifikasi : string;
  tanggal : null;
  keterangan : string;
  createdby : string;
  createddate : null;
  updateby : string;
  updatetime : null;
  idpegNavigation : IPegawai;
  idrkabNavigation : IRkab;
}
