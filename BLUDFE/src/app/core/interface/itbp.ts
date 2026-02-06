import { Ibend } from './ibend';
import { IDaftunit } from './idaftunit';
import { IStattrs } from './istattrs';

export interface ITbp {
  idtbp : number;
  idunit : number;
  notbp : string;
  idbend1 : number;
  kdstatus : string;
  idbend2 : number;
  idxkode : number;
  tgltbp : null;
  penyetor : string;
  alamat : string;
  uraitbp : string;
  tglvalid : null;
  valid: boolean;
  validby: string;
  ketvalid: string;
  datecreate : null;
  dateupdate : null;
  idbend1Navigation : Ibend;
  idbend2Navigation : Ibend;
  idunitNavigation : IDaftunit;
  kdstatusNavigation : IStattrs;
  skptbp: any;
}
