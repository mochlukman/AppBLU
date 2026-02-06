import { IDaftrekening } from './idaftrekening';
import { IJdana } from './ijdana';
import { IMkegiatan } from './imkegiatan';

export interface IRkar {
  idrkar: number;
  idrkarx: number;
  idunit: number;
  kdtahap: string;
  idrek: number;
  idrekNavigation: IDaftrekening;
  idkeg: number;
  idkegNavigation: IMkegiatan;
  nilai: number;
  createdby: string;
  createddate: null;
  updateby: string;
  updatetime: null;
  rkarx: IRkar;
}
