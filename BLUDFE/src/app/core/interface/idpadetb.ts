import { IJsatuan } from './ijsatuan';
import { IStdharga } from './istdharga';

export interface IDpadetb{
  iddpadetb: number;
  iddpab: number;
  kdjabar: string;
  uraian: string;
  jumbyek: number;
  satuan: string;
  tarif: number;
  subtotal: number; 
  ekspresi: string;
  inclsubtotal: boolean;
  type: string;
  idstdharga: number;
  standarHarga: IStdharga;
  datecreate: null;
  dateupdate: null;
  iddpadetbduk: number;
  idsatuan: number;
  jsatuan: IJsatuan;
}