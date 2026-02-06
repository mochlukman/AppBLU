import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message, TreeNode } from 'primeng/api';
import { ICheckRekening, ILookupTree } from 'src/app/core/interface/iglobal';
import { DaftrekeningService } from 'src/app/core/services/daftrekening.service';
@Component({
  selector: 'app-look-tree-rek-by-dpa',
  templateUrl: './look-tree-rek-by-dpa.component.html',
  styleUrls: ['./look-tree-rek-by-dpa.component.scss']
})
export class LookTreeRekByDpaComponent implements OnInit {
  showThis: boolean;
  title: string;
  msgs: Message[];
  listdata: ILookupTree[];
	dataselected: ILookupTree[];
  loading: boolean;
  dataReturn: ICheckRekening[] = [];
	@Output() callBack = new EventEmitter();
  constructor(
    private service: DaftrekeningService
  ) { }

  ngOnInit() {
  }
  get(Idunit: number, Idspp: number, Kdtahap: string, Idnojetra: number, Idxkode: number, Kdstatus: string) {
    this.listdata = [];
    this.msgs = [];
		this.loading = true;
		this.service.getTreeCheckboxByDpa(Idunit, Idspp, Kdtahap, Idnojetra, Idxkode, Kdstatus).subscribe((resp) => {
			if(resp.length > 0){
				this.listdata = resp;
			} else {
				this.msgs.push({ severity: 'info', summary: 'Info', detail: 'Data Tidak Tersedia' });
			}
			this.loading = false;
		},(error) => {
			this.loading = false;
			if(Array.isArray(error.error.error)){
				for(var i = 0; i < error.error.error; i++){
					this.msgs.push({severity: 'error', summary: 'Error', detail: error.error.error[i]});
				}
			} else {
				this.msgs.push({severity: 'error', summary: 'Error', detail: error.error});
			}
		});
	}
  pilih() {
    this.dataReturn = [];
    if(this.dataselected.length > 0){
      let idkegs: number[] = this.dataselected.map(m => {
        if(m.this_level == 'sub_kegiatan') return m.data_id;
        if(m.this_level == 'rekening') return m.data_id_parent;
      });
      idkegs = idkegs.filter((x, i, a) => a.indexOf(x) == i).filter(f => f !== undefined);
      if(idkegs.length > 0){
        idkegs.forEach(e => this.dataReturn.push({Idkeg : e, Idrek:[]}));
      }
      if(this.dataReturn.length > 0){
        this.dataReturn.forEach(e => {
          let Idreks = this.dataselected.map(map => {
            if(map.this_level === 'rekening' && map.data_id_parent === e.Idkeg) return map.idrek;
          }).filter(f => f !== undefined);
          e.Idrek = Idreks;
        });
      }
      this.callBack.emit(this.dataReturn);
      this.onHide();
    } else {
      this.msgs = [];
      this.msgs.push({ severity: 'warn', summary: 'Peringatan', detail: 'Belum Ada Data Yang Dipilih' });
    }

	}
  batal(){
    this.msgs = [];
		this.dataselected = [];
    this.dataReturn = [];
    this.callBack.emit([{Batal: true}]);
		this.showThis = false;
  }
  onHide(){
    this.msgs = [];
		this.dataselected = [];
    this.dataReturn = [];
		this.showThis = false;
  }
}
