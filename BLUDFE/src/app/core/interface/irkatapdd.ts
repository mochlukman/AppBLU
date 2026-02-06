import { IPegawai } from './ipegawai';
import { IRkad } from './irkad';

export interface IRkatapdd {
  idtapdd : number;
  idrkad : number;
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
  idrkadNavigation : IRkad;
}