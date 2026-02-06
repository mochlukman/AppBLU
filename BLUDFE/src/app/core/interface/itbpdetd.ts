import { IDaftrekening } from './idaftrekening';

export interface ITbpdetd {
  idtbpdetd : number;
  idtbp : number;
  idrek : number;
  idnojetra : number;
  nilai : number;
  idrekNavigation : IDaftrekening;
}
