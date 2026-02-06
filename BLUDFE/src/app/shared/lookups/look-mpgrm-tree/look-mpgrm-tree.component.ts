import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message, TreeNode } from 'primeng/api';
import { MpgrmService } from 'src/app/core/services/mpgrm.service';

@Component({
  selector: 'app-look-mpgrm-tree',
  templateUrl: './look-mpgrm-tree.component.html',
  styleUrls: ['./look-mpgrm-tree.component.scss']
})
export class LookMpgrmTreeComponent implements OnInit {
  private Idurus: number;
  set _idurus(e: number){
    this.Idurus = e;
  }
  showThis: boolean;
  title: string;
  msgs: Message[];
  listdata: TreeNode[];
	dataselected: TreeNode;
  loading: boolean;
	@Output() callBack = new EventEmitter();
  constructor(
    private service: MpgrmService
  ) { }

  ngOnInit() {
  }
  get() {
    this.listdata = [];
    this.msgs = [];
		this.loading = true;
    this.service._idurus = this.Idurus;
		this.service.tree().subscribe((resp) => {
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
      this.msgs.push({ severity: 'warn', summary: 'Peringatan', detail: 'Pilih Program' });
    }
	}
  onShow(){
    this.get();
  }
  onHide(){
    this.msgs = [];
		this.dataselected = undefined;
		this.showThis = false;
  }
}
