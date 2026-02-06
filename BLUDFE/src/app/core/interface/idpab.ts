import { IDaftrekening } from './idaftrekening';

export interface IDpab {
  iddpab: number;
  iddpa: number;
  kdtahap: string;
  idrek: number;
  rekening: IDaftrekening;
  nilai: number;
  datecreate: null;
  dateupdate: null;
}

