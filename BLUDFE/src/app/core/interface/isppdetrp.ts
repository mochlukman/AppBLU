import { IPajak } from './ipajak';
import { ISppdetr } from './isppdetr';

export interface ISppdetrp {
  idsppdetrp : number;
  idsppdetr : number;
  idpajak : number;
  nilai : number;
  keterangan : string;
  idbilling : string;
  tglbilling : null;
  ntpn : string;
  ntb : string;
  createdate : null;
  createby : string;
  updatedate : null;
  updateby : string;
  idpajakNavigation : IPajak;
  idsppdetrNavigation : ISppdetr;
}