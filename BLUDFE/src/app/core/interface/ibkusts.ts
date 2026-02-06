import { Ibend } from './ibend';
import { IDaftunit } from './idaftunit';
import { ISts } from './ists';

export interface IBkusts {
  idbkusts : number;
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
  idstsNavigation : ISts;
  idunitNavigation : IDaftunit;
}
