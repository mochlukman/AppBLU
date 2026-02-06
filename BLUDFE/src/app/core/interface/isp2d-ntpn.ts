import { ISp2d } from './isp2d';
import { IStattrs } from './istattrs';
import { IZkode } from './izkode';

export interface ISp2dNtpn {
  idntpn : number;
  ntpn : string;
  tglntpn : null;
  idunit : number;
  idsp2d : number;
  nosp2d : string;
  tglsp2d : null;
  idxkode : number;
  kdstatus : string;
  idbilling : string;
  idsp2dNavigation : ISp2d;
  idxkodeNavigation : IZkode;
  kdstatusNavigation : IStattrs;
}