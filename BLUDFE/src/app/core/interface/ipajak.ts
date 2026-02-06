import { IJjnspajak } from './ijjnspajak';

export interface IPajak {
  idpajak : number;
  kdpajak : string;
  nmpajak : string;
  kdper: string;
  uraian : string;
  keterangan : string;
  rumuspajak : string;
  idjnspajak : number;
  staktif : number;
  datecreate : null;
  dateupdate : null;
  idjnspajakNavigation : IJjnspajak;
}