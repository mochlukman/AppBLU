import { ISts } from './ists';
import { ITbp } from './itbp';

export interface ITbpsts {
  idtbp : number;
  idsts : number;
  idstsNavigation : ISts;
  idtbpNavigation : ITbp;
}
