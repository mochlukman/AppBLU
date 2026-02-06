import { Ibend } from './ibend';
import { IBkuPanjar } from './ibku-panjar';
import { IStattrs } from './istattrs';
import { IZkode } from './izkode';

export interface IPanjar {
  idpanjar : number;
  idunit : number;
  nopanjar : string;
  idbend : number;
  idpeg : number;
  idxkode : number;
  kdstatus : string;
  sttunai : boolean;
  stbank : boolean;
  tglpanjar : number;
  uraian : string;
  referensi: string;
  tglvalid : null;
  valid: boolean;
  validby: null;
  datecreate : null;
  dateupdate : null;
  idbendNavigation : Ibend;
  idxkodeNavigation : IZkode;
  kdstatusNavigation : IStattrs;
  bkupanjar: IBkuPanjar[];
}
