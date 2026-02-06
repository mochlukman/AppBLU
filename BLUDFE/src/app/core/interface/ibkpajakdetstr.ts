import { IBkpajak } from './ibkpajak';
import { IPajak } from './ipajak';

export interface IBkpajakdetstr {
  idbkpajakdetstr : number;
  idbpkpajakstr : number;
  idpajak : number;
  idbkpajak : number;
  idbilling : string;
  tglidbilling : null;
  tglexpire : null;
  ntpn : string;
  ntb : string;
  datecreate : null;
  dateupdate : null;
  idbkpajakNavigation : IBkpajak;
  idbpkpajakstrNavigation : null;
  idpajakNavigation : IPajak;
}