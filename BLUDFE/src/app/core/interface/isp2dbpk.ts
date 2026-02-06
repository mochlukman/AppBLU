import { IBpk } from './ibpk';
import { ISp2d } from './isp2d';

export interface ISp2dbpk {
  idbpk : number;
  idsp2d : number;
  datecreate : null;
  idbpkNavigation : IBpk;
  idsp2dNavigation : ISp2d;
}
