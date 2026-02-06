import { Ibend } from './ibend';
import { IDaftunit } from './idaftunit';
import { IPanjar } from './ipanjar';

export interface IBkuPanjar {
  idbkupanjar : number;
  nobkuskpd : string;
  idunit : number;
  idttd : number;
  tglbkuskpd : null;
  idpanjar : number;
  uraian : string;
  tglvalid : null;
  idbend : number;
  datecreate : null;
  dateupdate : null;
  IdbendNavigation: Ibend;
  idpanjarNavigation : IPanjar;
  idunitNavigation : IDaftunit;
}