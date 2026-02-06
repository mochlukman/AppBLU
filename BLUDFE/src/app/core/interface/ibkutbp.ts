import { Ibend } from './ibend';
import { IDaftunit } from './idaftunit';
import { ITbp } from './itbp';

export interface IBkutbp {
  idbkutbp : number;
  nobkuskpd : string;
  idunit : number;
  idttd : number;
  tglbkuskpd : null;
  idtbp : number;
  uraian : string;
  tglvalid : null;
  idbend : number;
  datecreate : null;
  dateupdate : null;
  idbendNavigation : Ibend;
  idtbpNavigation : ITbp;
  idunitNavigation : IDaftunit;
}