import { IPegawai } from './ipegawai';
import { IRkar } from './irkar';

export interface IRkatapdr {
  idtapdr : number;
  idrkar : number;
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
  idrkarNavigation : IRkar;
}
