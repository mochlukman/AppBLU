import { Ibend } from './ibend';
import { IDaftunit } from './idaftunit';
import { IStattrs } from './istattrs';

export interface IBkbank {
  idbkbank : number;
  idunit : number;
  idbend : number;
  nobuku : string;
  kdstatus : string;
  tglbuku : null;
  uraian : string;
  tglvalid : null;
  valid: null;
  idbendNavigation : Ibend;
  idunitNavigation : IDaftunit;
  kdstatusNavigation : IStattrs;
}
