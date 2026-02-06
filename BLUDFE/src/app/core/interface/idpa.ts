import { IDaftunit } from './idaftunit';
import { ITahap } from './itahap';

export interface IDpa {
  iddpa: number;
  jdpa: number;
  idunit: number;
  nodpa: string;
  tgldpa: null;
  nosah: string;
  keterangan: string;
  tglsah: null;
  sah: boolean;
  sahby: string;
  tglvalid: null;
  valid: boolean;
  validby: string;
  datecreate: string;
  dateupdate: string;
  kdtahap: string;
  idxkode: number;
  pendapatan : number;
  belanja : number;
  pembiayaantr : number;
  pembiayaankr : number;
  idunitNavigation: IDaftunit;
  kdtahapNavigation: ITahap;
}
