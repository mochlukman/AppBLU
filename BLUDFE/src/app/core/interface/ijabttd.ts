import { IDaftdok } from './idaftdok';
import { IPegawai } from './ipegawai';

export interface IJabttd {
  idttd : number;
  idunit : number;
  idpeg : number;
  kddok : string;
  jabatan : string;
  noskpttd : string;
  tglskpttd : null;
  noskstopttd : string;
  tglskstopttd : null;
  datecreate : null;
  dateupdate : null;
  kddokNavigation : IDaftdok;
  idpegNavigation : IPegawai;
}
