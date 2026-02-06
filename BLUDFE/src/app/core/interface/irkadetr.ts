import { IStdharga } from './istdharga';

export interface IRkadetr {
  idrkadetr: number;
  idrkadetrx: number;
  idrkar: number;
  kdnilai: number;
  kdjabar: string;
  uraian: string;
  jumbyek: null;
  satuan: string;
  tarif: number;
  subtotal: number;
  ekspresi: string;
  inclsubtotal: number;
  type: string;
  idstdharga: number;
  idstdhargaNavigation: IStdharga;
  createdby: null;
  createddate: null;
  updateby: null;
  updatetime: null;
  idrkadetrduk: number;
  idssh: number;
  idjdana: number;
  idsshNavigation: any;
  idjdanaNavigation: any;
}
