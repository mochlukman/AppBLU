import { IBpk } from './ibpk';
import { IStattrs } from './istattrs';

export interface IBpkpajak {
  idbpkpajak : number;
  idbpk : number;
  nomor : string;
  uraian: string;
  tanggal : null;
  kdstatus : string;
  datecreate : null;
  dateupdate : null;
  nilai: number; // SUM BPKPAJAKDET.NILAI
  idbpkNavigation : IBpk;
  kdstatusNavigation : IStattrs;
}
