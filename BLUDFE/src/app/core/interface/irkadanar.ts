import { IJdana } from './ijdana';
import { IRkar } from './irkar';

export interface IRkadanar {
  idrkadanar : number;
  idrkadanarx : number;
  idrkar : number;
  idjdana : number;
  nilai : number;
  createdby : string;
  createddate : null;
  updateby : string;
  updatetime : null;
  idrkarNavigation : IRkar;
  idjdanaNavigation : IJdana;
  Rkadanarx : IRkadanar;
}