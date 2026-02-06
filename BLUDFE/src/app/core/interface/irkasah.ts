import { IDaftunit } from './idaftunit';
import { IPegawai } from './ipegawai';

export interface IRkasah {
  idrkasah : number;
  idunit : number;
  idpeg : number;
  nippeg : string;
  namapeg : string;
  kdtahap : number;
  uraian : string;
  tglsah : null;
  createdby : string;
  createddate : number;
  updateby : string;
  updatetime : number;
  idpegNavigation : IPegawai;
  idunitNavigation : IDaftunit;
}