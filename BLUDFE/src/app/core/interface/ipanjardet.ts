import { IJtrnlkas } from './ijtrnlkas';
import { IMkegiatan } from './imkegiatan';
import { IPanjar } from './ipanjar';

export interface IPanjardet {
  idpanjardet : number;
  idpanjar : number;
  idkeg : number;
  idnojetra : number;
  nilai : number;
  datecreate : null;
  dateupdate : null;
  idpanjarNavigation : IPanjar;
  kegiatan : IMkegiatan;
  idnojetraNavigation : IJtrnlkas;
}