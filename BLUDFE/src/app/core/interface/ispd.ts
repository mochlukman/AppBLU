import { IBulan } from './ibulan';
import { IDaftrekening } from './idaftrekening';
import { IDaftunit } from './idaftunit';
import { IJabttd } from './ijabttd';
import { IMkegiatan } from './imkegiatan';

export interface ISpd{
  idspd : number;
  idunit : number;
  daftunit : IDaftunit;
  nospd : string;
  tglspd : null;
  idbulan1 : number;
  bulan1: IBulan;
  idbulan2 : number;
  bulan2: IBulan;
  idxkode : number;
  keterangan : string;
  valid: boolean;
  tglvalid : null;
  datecreate : null;
  dateupdate : null;
  idttd: number;
  jabttd: IJabttd;
}
export interface ISpddetb
{
  idspddetb : number;
  idspd : number;
  idrek : number;
  rekening : IDaftrekening;
  nilai : number;
  datecreate : null;
  dateupdate : null;
}
export interface ISpddetr
{
  idspddetr : number;
  idspd : number;
  idkeg : number;
  kegiatan : IMkegiatan;
  idrek : number;
  rekening : IDaftrekening;
  nilai : number;
  datecreate : null;
  dateupdate : null;
}
export interface ISpddetrTreeRoot{
  data: ISpddetrData;
  children: ISpddetrTreeRoot[];
  expanded: boolean;
}
export interface ISpddetrData{
  rowid : string;
  level : string;
  kode : string;
  uraian : string;
  idspddetr : number;
  idrek : number;
  idkeg : number;
  idspd : number;
  nilai : number;
}