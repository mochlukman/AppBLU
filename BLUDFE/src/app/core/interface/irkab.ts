import { IDaftrekening } from './idaftrekening';
import { IStdharga } from './istdharga';

export interface IRkab {
  idrkab: number;
  idrkabx: number;
  idunit: number;
  kdtahap: string;
  idrek: number;
  idrekNavigation: IDaftrekening;
  nilai: number;
  createdby: string;
  createddate: null;
  updateby: string;
  updatetime: null;
  trkr: number;
  rkabx: IRkab;
}