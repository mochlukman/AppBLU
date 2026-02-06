import { ICheckdok } from './icheckdok';
import { ISpp } from './ispp';

export interface ISppcheckdok {
  idspp : number;
  idcheck : number;
  createdate : null;
  createby : string;
  updatedate : number;
  updateby : string;
  idcheckNavigation : ICheckdok;
  idsppNavigation : ISpp;
}
