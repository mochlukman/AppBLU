import { IDaftunit } from './idaftunit';
import { IKontrak } from './ikontrak';
import { IMkegiatan } from './imkegiatan';

export interface IAdendum {
  idadd : number;
  idunit : number;
  idkeg : number;
  noadd : string;
  tgladd : null;
  idkontrak : number;
  nilaiawal : number;
  nilaiadd : number;
  datecreate : null;
  dateupdate : null;
  idkegNavigation : IMkegiatan;
  idkontrakNavigation : IKontrak;
  idunitNavigation : IDaftunit;
}
