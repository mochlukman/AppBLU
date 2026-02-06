import { IDaftrekening } from './idaftrekening';

export interface Ispmdetd {
  idspmdetd : number;
  idspm : number;
  idrek : number;
  idnojetra : number;
  nilai : number;
  idrekNavigation : IDaftrekening;
  createdate : null;
  createby : string;
  updatedate : null;
  updateby : string;
}
