export interface IBku {
  nmr : number;
  idunit : number;
  idbend : number;
  idxttd : number;
  nobkuskpd : string;
  nobukti : string;
  tgl1 : null;
  tgl2 : null;
  tglbkuskpd : null;
  tglvalid : null;
  uraian : string;
  tglbukti : null;
  tglkas : null;
  jenis : string;
  idxkode : number;
  kdstatus : number;
  afektasi : number;
  potongan : number;
  dibayar : number;
}
export interface IBkuPenerimaan {
  idbku: number;
  nmr : number;
  idunit : number;
  idbend : number;
  idxttd : number;
  nobkuskpd : string;
  nobukti : string;
  tgl1 : null;
  tgl2 : null;
  tglbkuskpd : null;
  tglvalid : null;
  tglvalidbku : null;
  uraian : string;
  tglbukti : null;
  tglkas : null;
  jenis : string;
  idxkode : number;
  kdstatus : number;
  penerimaan : number;
  potongan : number;
  diterima : number;
}