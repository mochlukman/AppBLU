import { IStruunit } from './istruunit';

export interface IDafturus {
  idurus : number;
  kdurus : string;
  nmurus : string;
  kdlevel : number;
  type : string;
  akrounit : string;
  alamat : string;
  telepon : string;
  staktif : number;
  datecreate : null;
  dateupdate : null;
  kdlevelNavigation : IStruunit;
}
