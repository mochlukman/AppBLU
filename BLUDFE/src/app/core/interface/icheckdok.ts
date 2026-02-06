import { ISppcheckdok } from './isppcheckdok';
import { IZkode } from './izkode';

export interface ICheckdok {
  idcheck :  number;
  uraian :  number;
  idxkode :  number;
  idxkodeNavigation :  IZkode;
  sppcheckdok : ISppcheckdok;
}
