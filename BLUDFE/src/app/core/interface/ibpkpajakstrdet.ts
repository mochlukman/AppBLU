import { IBpkpajak } from './ibpkpajak';
import { IBpkpajakstr } from './ibpkpajakstr';

export interface IBpkpajakstrdet {
  idbpkpajakstrdet : number;
  idbpkpajakstr : number;
  idbpkpajak : number;
  nilai : number;
  datecreate : null;
  dateupdate : null;
  idbpkpajakstrNavigation : IBpkpajakstr;
  idbpkpajakNavigation : IBpkpajak;
}
