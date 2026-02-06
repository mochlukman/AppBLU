import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message, TreeNode } from 'primeng/api';
import { MkegiatanService } from 'src/app/core/services/mkegiatan.service';

@Component({
  selector: 'app-look-mkegiatan-by-dpa',
  templateUrl: './look-mkegiatan-by-dpa.component.html',
  styleUrls: ['./look-mkegiatan-by-dpa.component.scss']
})
export class LookMkegiatanByDpaComponent implements OnInit {
  showThis: boolean;
  title: string;
  msgs: Message[];
  listdata: TreeNode[];
	dataselected: TreeNode;
  loading: boolean;
	@Output() callBack = new EventEmitter();
  constructor(
    private service: MkegiatanService
  ) { }

  ngOnInit() {
  }
  get(Idunit: number, Kdtahap: string) {
    this.listdata = [];
    this.msgs = [];
		this.loading = true;
		this.service.treeByDpa(Idunit, Kdtahap).subscribe((resp) => {
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
    if (this.dataselected.children === null) {
      this.callBack.emit(this.dataselected);
      this.onHide();
    } else {
      this.msgs = [];
      this.msgs.push({ severity: 'warn', summary: 'Peringatan', detail: 'Pilih Sub Kegiatan' });
    }
	}
  onHide(){
    this.msgs = [];
		this.dataselected = undefined;
		this.showThis = false;
  }
}
