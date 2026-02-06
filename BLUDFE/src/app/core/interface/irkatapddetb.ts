import { IPegawai } from './ipegawai';
import { IRkadetb } from './irkadetb';

export interface IRkatapddetb {
  idtapddetb : number;
  idrkadetb : number;
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
  idrkadetbNavigation : IRkadetb;
}
