import { IDaftrekening } from './idaftrekening';

export interface Ispmdetb {
  idspmdetb : number;
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
