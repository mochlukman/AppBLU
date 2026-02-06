import { IBkusts } from './ibkusts';
import { ISpjtr } from './ispjtr';

export interface IBkustsspjtr {
  idbkustsspjtr : number;
  idspjtr : number;
  idbkusts : number;
  datecreate : null;
  dateupdate : null;
  idbkustsNavigation : IBkusts;
  idspjtrNavigation : ISpjtr;
  nilai: number;
}
