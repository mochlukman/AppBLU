import { IDaftrekening } from './idaftrekening';
import { IJtrnlkas } from './ijtrnlkas';
import { ISpp } from './ispp';

export interface ISppdetb {
  idsppdetb : number;
  idrek : number;
  idspp : number;
  idnojetra : number;
  nilai : number;
  createdate : null;
  createby : string;
  updatedate : null;
  updateby : string;
  idnojetraNavigation : IJtrnlkas;
  idrekNavigation : IDaftrekening;
  idsppNavigation : ISpp;
  totspd: number;
  sisa: number;
}