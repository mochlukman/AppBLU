export interface IDisplayGlobal {
  kode: string;
  nama: string;
}
export interface ILookupTree {
	label: string;
	data_id: number;
  data_id_parent: number;
	expandedIcon: string;
	collapsedIcon: string;
	children: null;
  kegInduk: string;
  this_header: boolean;
  this_level: string;
  idrek: number;
  idkegFK?: number;
}

export interface ICheckRekening{
  Idkeg: number;
  Idrek: number[];
  Batal?: boolean;
}
export interface ILookupTree2{
  label : string;
  data_kode : string;
  data_nama : string;
  data_id : number;
  data_id_parent : number;
  expandedIcon : string;
  collapsedIcon : string;
  children : null;
  label_parent : string;
  this_header : boolean;
  this_level : string;
  this_type : string;
}
export interface ITrackingdata{
  canenter : boolean;
  active : number;
  title : string;
  desc : string;
  done: number; // 1 : belum, 2 : berlangsung, 3: finish
}