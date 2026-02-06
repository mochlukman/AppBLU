import { IDaftrekening } from './idaftrekening';
import { IStdharga } from './istdharga';

export interface IRkad {
  idrkad: number;
  idrkadx: number;
  idunit: number;
  kdtahap: string;
  idrek: number;
  idrekNavigation: IDaftrekening;
  nilai: number;
  createdby: string;
  createddate: null;
  updateby: string;
  updatetime: null;
  rkadx: IRkad;
}
export interface IRkadetd
{
  idrkadetd : number;
  idrkadetdx : number;
  idrkad : number;
  kdjabar : string;
  uraian : string;
  jumbyek : number;
  idsatuan : number;
  satuan : string;
  tarif : number;
  subtotal : number;
  ekspresi : string;
  inclsubtotal : number;
  type : string;
  idstdharga : number;
  createdby : string;
  createddate : null;
  updateby : string;
  updatetime : null;
  idrkadetdduk : number;
  idrkadNavigation : IRkad;
}