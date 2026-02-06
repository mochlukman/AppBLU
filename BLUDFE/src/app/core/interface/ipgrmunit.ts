import { IDaftunit } from './idaftunit';
import { IMpgrm } from './IMpgrm';
import { ITahap } from './itahap';

export interface IPgrmunit {
  idpgrmunit: number;
  idpgrmunitx: number;
  idunit: number;
  kdtahap: string;
  idprgrm: number;
  target: string;
  sasaran: string;
  noprio: number;
  indikator: string;
  ket: string;
  idsas: string;
  tglvalid: null;
  idxkode: null;
  datecreate: null;
  dateupdate: null;
  idprgrmNavigation: IMpgrm;
  idsasNavigation: null;
  idunitNavigation: IDaftunit;
  kdtahapNavigation: ITahap;
  pgrmunitx: IPgrmunit;
}
