import { Ibend } from './ibend';
import { IDaftunit } from './idaftunit';
import { IStattrs } from './istattrs';
import {IDaftphk3} from 'src/app/core/interface/idaftphk3';

export interface ISkp {
  idskp : number;
  idunit : number;
  noskp : string;
  kdstatus : string;
  idbend : number;
  npwpd : string;
  idxkode : number;
  tglskp : null;
  penyetor : string;
  alamat : string;
  uraiskp : string;
  tgltempo : null;
  bunga : number;
  kenaikan : number;
  tglvalid : null;
  valid: boolean;
  validby: null;
  idphk3: number;
  idbendNavigation : Ibend;
  idunitNavigation : IDaftunit;
  kdstatusNavigation: IStattrs
  idphk3Navigation: IDaftphk3;
}
