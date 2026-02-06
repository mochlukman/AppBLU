import { IPegawai } from './ipegawai';
import { IRkadetd } from './irkadetd';

export interface IRkatapddetd {
  idtapddetd : number;
  idrkadetd : number;
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
  idrkadetdNavigation : IRkadetd;
}
