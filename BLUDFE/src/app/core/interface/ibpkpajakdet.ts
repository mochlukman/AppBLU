import { IBpkpajak } from './ibpkpajak';
import { IPajak } from './ipajak';

export interface IBpkpajakdet {
  idbpkpajakdet : number;
  idbpkpajak : number;
  idpajak : number;
  nilai : number;
  idbilling : string;
  tglbilling : null;
  ntpn : string;
  ntb : string;
  datecreate : null;
  dateupdate : null;
  idbpkpajakNavigation : IBpkpajak;
  idpajakNavigation : IPajak;
}
