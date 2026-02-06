import { ISkp } from './iskp';
import { ISts } from './ists';

export interface ISkpsts {
  idsts : number;
  idskp : number;
  idskpNavigation : ISkp;
  idstsNavigation : ISts;
}
