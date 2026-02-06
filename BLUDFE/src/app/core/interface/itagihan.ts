import { IDaftrekening } from './idaftrekening';
import { IKontrak } from './ikontrak';
import { IMkegiatan } from './imkegiatan';
import { IStattrs } from './istattrs';
import { IBulan } from './ibulan';

export interface ITagihan {
  idtagihan : number;
  idunit : number;
  idkeg : number;
  kegiatan: IMkegiatan;
  notagihan : string;
  tgltagihan : string;
  idkontrak : number;
  uraiantagihan : string;
  bulan : string;
  idbulan : number;
  nofaktur : string;
  nilaippn : number;
  tglvalid : null;
  valid: null,
  validby: null,
  kdstatus : string;
  datecreate : null;
  dateupdate : null;
  idkontrakNavigation : IKontrak
  kdstatusNavigation : IStattrs
  idbulanNavigation : IBulan;
}
export interface ITagihandet{
  idtagihandet : number;
  idtagihan : number;
  idrek : number;
  rekening : IDaftrekening;
  nilai : number;
  datecreate : null;
  dateupdate : null;
}
