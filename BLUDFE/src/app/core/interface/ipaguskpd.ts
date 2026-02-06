import { IDaftunit } from './idaftunit';
import { ITahap } from './itahap';

export interface IPaguskpd {
  idpaguskpd: number;
  idunit: number;
  kdunit: string;
  nmunit: string;
  kdtahap: string;
  nilaiup: number;
  nilai: number;
  datecreate: null;
  dateupdate: null;
  idunitNavigation: IDaftunit;
  kdtahapNavigation: ITahap;
}
