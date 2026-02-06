import { IJkeg } from './ijkeg';
import { IMpgrm } from './IMpgrm';

export interface IMkegiatan{
  idkeg : number;
  idprgrm : number;
  kdperspektif : number;
  nukeg : string;
  nmkegunit : string;
  levelkeg : number;
  type : string;
  idkeginduk : number;
  staktif : boolean;
  stvalid : boolean;
  jnskeg: number;
  jnskegNavigation: IJkeg;
  datecreate : null;
  dateupdate : null;
  idprgrmNavigation: IMpgrm;
}