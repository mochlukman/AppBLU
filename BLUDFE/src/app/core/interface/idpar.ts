import { IDaftrekening } from './idaftrekening';
import { IMkegiatan } from './imkegiatan';

export interface IDpar {
  iddpar: number;
  iddpa: number;
  kdtahap: string;
  idrek: number;
  rekening: IDaftrekening;
  idkeg: number;
  kegiatan: IMkegiatan;
  nilai: number;
  datecreate: null;
  dateupdate: null;
  upGu : number;
  ls : number;
  tu : number;
}

