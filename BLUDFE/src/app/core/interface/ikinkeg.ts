import { IJkinkeg } from './ijkinkeg';
import { Ikegunit } from './ikegunit';

export interface IKinkeg {
  idkinkeg : number;
  idkinkegx: number;
  idkegunit : number;
  kdjkk : string;
  nomor : string;
  tolokur : string;
  target : number;
  satuan : string;
  keterangan : number;
  datecreate : null;
  dateupdate : null;
  idkegunitNavigation : Ikegunit;
  kdjkkNavigation : IJkinkeg;
  kinkegx: IKinkeg;
}