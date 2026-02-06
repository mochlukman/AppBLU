import { Ibend } from './ibend';
import { IJtrnlkas } from './ijtrnlkas';
import { ITbp } from './itbp';

export interface ITbpdett {
  idtbpdett : number;
  idtbp : number;
  idbend : number;
  idnojetra : number;
  nilai : number;
  datecreate : null;
  dateupdate : null;
  idbendNavigation : Ibend;
  idnojetraNavigation : IJtrnlkas;
  idtbpNavigation : ITbp;
}