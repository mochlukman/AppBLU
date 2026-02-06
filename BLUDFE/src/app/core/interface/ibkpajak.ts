import { Ibend } from './ibend';
import { IDaftunit } from './idaftunit';
import { IStattrs } from './istattrs';
import { IZkode } from './izkode';

export interface IBkpajak {
  idbkpajak : number;
  idunit : number;
  idbend : number;
  nobkpajak : string;
  idttd : number;
  kdstatus : string;
  tglbkpajak : null;
  uraian : string;
  tglvalid : null;
  kdrilis : number;
  stkirim : number;
  stcair : number;
  idtransfer : number;
  datecreate : null;
  dateupdate : null;
  idbendNavigation : Ibend;
  idttdNavigation : IZkode;
  idunitNavigation : IDaftunit;
  kdstatusNavigation : IStattrs;
  stcairNavigation : null;
  stkirimNavigation : null;
}