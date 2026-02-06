import { IDaftbank } from './idaftbank';
import { IJbend } from './ijbend';
import { IPegawai } from './ipegawai';

export interface Ibend {
  idbend : number;
  idpemda : number;
  jnsbend : string;
  idpeg : number;
  idbank : number;
  nmcabbank : string;
  rekbend : string;
  npwpbend : string;
  jabbend : string;
  saldobankup : number;
  saldobankpajak : number;
  saldotunaiup : number;
  saldotunaipajak : number;
  tglstopbend : null;
  warganegara : string;
  stpendududuk : string;
  staktif : number;
  datecreate : null;
  idbankNavigation : IDaftbank;
  idpegNavigation : IPegawai;
  jnsbendNavigation : IJbend;
  combine: string;
}
