import { ICheckdok } from './icheckdok';
import { ISp2d } from './isp2d';

export interface ISp2dcheckdok {
  idsp2d : number;
  idcheck : number;
  createdate : null;
  createby : string;
  updatedate : number;
  updateby : string;
  idcheckNavigation : ICheckdok;
  idsp2dNavigation : ISp2d;
}
