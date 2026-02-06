import { IPegawai } from './ipegawai';
import { IRkadetr } from './irkadetr';

export interface IRkatapddetr {
  idtapddetr : number;
  idrkadetr : number;
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
  idrkadetrNavigation : IRkadetr;
}
