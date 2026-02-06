import { IBpk } from './ibpk';
import { IDaftunit } from './idaftunit';
import { IStattrs } from './istattrs';
import {Ibend} from 'src/app/core/interface/ibend';

export interface IBpkpajakstr {
  idbpkpajakstr : number;
  idunit : number;
  idbend : number;
  nomor : string;
  uraian: string;
  tanggal : null;
  kdstatus : string;
  datecreate : null;
  dateupdate : null;
  nilai: number; // SUM BPKPAJAKDET.NILAI
  valid: boolean;
  tglvalid: null;
  idunitNavigation : IDaftunit;
  idbendNavigation : Ibend;
  kdstatusNavigation : IStattrs;
}
