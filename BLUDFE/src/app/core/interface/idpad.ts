import { IDaftrekening } from './idaftrekening';
import { IDpa } from './idpa';

export interface IDpad {
  iddpad: number;
  iddpa: number;
  kdtahap: string;
  idrek: number;
  idrekNavigation: IDaftrekening;
  dpa: IDpa;
  nilai: number;
  datecreate: null;
  dateupdate: null;
}

