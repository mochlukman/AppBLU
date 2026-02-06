import { IDaftrekening } from './idaftrekening';

export interface ISkpdet {
  idskpdet : number;
  idskp : number;
  idrek : number;
  idnojetra : number;
  nilai : number;
  idrekNavigation : IDaftrekening;
}
