import { IDaftrekening } from './idaftrekening';

export interface IStsdetd {
  idstsdetd : number;
  idsts : number;
  idrek : number;
  idnojetra : number;
  nilai : number;
  idrekNavigation : IDaftrekening;
}
