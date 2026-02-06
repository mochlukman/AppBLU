import { IBpk } from './ibpk';
import { IDaftrekening } from './idaftrekening';
import { IJtrnlkas } from './ijtrnlkas';
import {IJdana} from 'src/app/core/interface/ijdana';

export interface IBpkdetr {
  idbpkdetr : number;
  idbpk : number;
  idkeg : number;
  idrek : number;
  idnojetra : number;
  idjdana: number;
  datecreate : null;
  nilai : number;
  dateupdate : null;
  idbpkNavigation : IBpk;
  idnojetraNavigation : IJtrnlkas;
  idrekNavigation : IDaftrekening;
  idjdanaNavigation: IJdana;
}
