import { Ibend } from './ibend';
import { IBkbkas } from './ibkbkas';
import { IDaftunit } from './idaftunit';
import { ISkpsts } from './iskpsts';
import { IStattrs } from './istattrs';
import { IZkode } from './izkode';

export interface ISts {
  idsts : number;
  idunit : number;
  nosts : string;
  idbend : number;
  kdstatus : string;
  idxkode : number;
  nobbantu : string;
  tglsts : null;
  uraian : string;
  tglvalid : null;
  valid: boolean;
  validby: string;
  ketvalid: string;
  kdrilis : number;
  stkirim : number;
  stcair : number;
  datecreate : null;
  dateupdate : null;
  idbendNavigation : Ibend;
  idunitNavigation : IDaftunit;
  idxkodeNavigation : IZkode;
  kdstatusNavigation : IStattrs;
  nobbantuNavigation : IBkbkas;
  skpsts : ISkpsts;
  nilaiup: number;
}