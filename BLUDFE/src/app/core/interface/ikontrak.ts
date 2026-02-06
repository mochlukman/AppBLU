import { IBulan } from './ibulan';
import { IDaftphk3 } from './idaftphk3';
import { IDaftrekening } from './idaftrekening';
import { IJtermorlun } from './ijtermorlun';
import { IMkegiatan } from './imkegiatan';

export interface IKontrak {
  idkontrak : number;
  idunit : number;
  nokontrak : string;
  idphk3 : number;
  idkeg : number;
  tglkontrak : null;
  tglakhirkontrak : null;
  uraian : string;
  nilai : number;
  datecreate : null;
  dateupdate : null;
  idkegNavigation : IMkegiatan;
  idphk3Navigation : IDaftphk3;
}
export interface IKontrakdetr{
  iddetkontrak : number;
  idkontrak : number;
  idrek : number;
  rekening : IDaftrekening;
  idbulan : number;
  bulan : IBulan;
  idjtermorlun : number;
  nilai : number;
  datecreate : null;
  dateupdate : null;
  idjtermorlunNavigation : IJtermorlun;
}
