import { IJsatuan } from './ijsatuan';
import { IStdharga } from './istdharga';

export interface IDpadetr{
  iddpadetr: number;
  iddpar: number;
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
  iddpadetrduk: number;
  idsatuan: number;
  jsatuan: IJsatuan;
}