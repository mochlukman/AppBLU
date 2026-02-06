import { IBpkdetr } from './ibpkdetr';
import { IPajak } from './ipajak';

export interface IBpkdetrp {
  idbpkdetrp : number;
  idbpkdetr : number;
  idpajak : number;
  nilai : number;
  datecreate : null;
  dateupdate : null;
  idbpkdetrNavigation : IBpkdetr;
  idpajakNavigation : IPajak;
}