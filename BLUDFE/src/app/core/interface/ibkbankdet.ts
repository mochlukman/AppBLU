import { IBkbank } from './ibkbank';
import { IJtrnlkas } from './ijtrnlkas';

export interface IBkbankdet {
  idbankdet : number;
  idbkbank : number;
  idnojetra : number;
  nilai : number;
  idbkbankNavigation : IBkbank;
  idnojetraNavigation : IJtrnlkas;
}