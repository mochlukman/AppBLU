import { IBpk } from './ibpk';

export interface IBpkSpj {
  datecreate: null;
  dateupdate: null;
  idbpk: number;
  idbpkNavigation: IBpk;
  idbpkspj: number;
  idspj: number;
  nilai: number;
}
export interface IBpkSpjTreeTableRoot{
  data: IBpkSpjTreeTableData;
  children: IBpkSpjTreeTableRoot[];
}
export interface IBpkSpjTreeTableData{
  idbpk: number;
  idbpkdetr: number;
  kode: string;
  nilai: number;
  row_id: string;
  this_level: string;
  uraian: string;
}
