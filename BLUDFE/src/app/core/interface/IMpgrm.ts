import { IDafturus } from './idafturus';

export interface IMpgrm {
  idprgrm : number;
  idurus : number;
  nmprgrm : string;
  nuprgrm : string;
  idprioda : number;
  idprioprov : number;
  idprionas : number;
  idxkode : number;
  staktif : boolean;
  stvalid : boolean;
  dateupdate : null;
  datecreate : null;
  IdurusNavigation: IDafturus
}