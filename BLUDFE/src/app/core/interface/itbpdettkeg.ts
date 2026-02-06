import { IMkegiatan } from './imkegiatan';
import { ITbpdett } from './itbpdett';

export interface ITbpdettkeg {
  idtbpdettkeg : number;
  idtbpdett : number;
  idkeg : number;
  nilai : number;
  datecreate : null;
  dateupdate : null;
  idkegNavigation : IMkegiatan;
  idtbpdettNavigation : ITbpdett;
}