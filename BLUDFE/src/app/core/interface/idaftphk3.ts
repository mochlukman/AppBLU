import { IDaftbank } from './idaftbank';
import { IDaftunit } from './idaftunit';
import { IJusaha } from './ijusaha';

export interface IDaftphk3 {
  idphk3 : number;
  idunit : number;
  nmphk3 : string;
  nminst : string;
  idbank : number;
  cabangbank : string;
  alamatbank : string;
  norekbank : string;
  namapemilik: string;
  idjusaha : number;
  alamat : string;
  telepon : string;
  npwp : string;
  warganegara : string;
  stpenduduk : string;
  stvalid : number;
  datecreate : null;
  dateupdate : null;
  idbankNavigation : IDaftbank,
  idjusahaNavigation : IJusaha,
  idunitNavigation : IDaftunit,
}
