import { IDp } from './idp';
import { ISp2d } from './isp2d';

export interface IDpdet {
  iddpdet : number;
  iddp : number;
  idsp2d : number;
  datecreate : null;
  dateupdate : null;
  iddpNavigation : IDp;
  idsp2dNavigation : ISp2d;
}