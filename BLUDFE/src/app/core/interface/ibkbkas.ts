import { IDaftbank } from './idaftbank';
import { IDaftrekening } from './idaftrekening';
import { IDaftunit } from './idaftunit';

export interface IBkbkas {
  nobbantu : string;
  idunit : number;
  idrek : number;
  idbank : number;
  nmbkas : string;
  norek : string;
  saldo : number;
  idbankNavigation : IDaftbank;
  idrekNavigation : IDaftrekening;
  idunitNavigation : IDaftunit;
}
