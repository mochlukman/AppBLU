import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { ILookupTree2 } from 'src/app/core/interface/iglobal';
import { MkegiatanService } from 'src/app/core/services/mkegiatan.service';

@Component({
  selector: 'app-look-mkegiatan-by-kegunit',
  templateUrl: './look-mkegiatan-by-kegunit.component.html',
  styleUrls: ['./look-mkegiatan-by-kegunit.component.scss']
})
export class LookMkegiatanByKegunitComponent implements OnInit {
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Kdtahap: string;
  set _kdtahap(e: string){
    this.Kdtahap = e;
  }
  private Type: string; // isi 'kegiatan' jika sampai kegiatan, subkegiatan jka sampai sub, default 'kegiatan'
  set _type(e: string){
    this.Type = e;
  }
  showThis: boolean;
  title: string;
  msgs: Message[];
  listdata: ILookupTree2[];
	dataselected: ILookupTree2;
  loading: boolean;
	@Output() callBack = new EventEmitter();
  constructor(
    private service: MkegiatanService
  ) { }

  ngOnInit() {
  }
  get() {
    this.listdata = [];
    this.msgs = [];
		this.loading = true;
    this.service._idunit = this.Idunit;
    this.service._kdtahap = this.Kdtahap;
    this.service._type = this.Type;
		this.service.treeByKegunit().subscribe((resp) => {
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
    if (this.dataselected.children === null && this.dataselected.this_header == false) {
      this.callBack.emit(this.dataselected);
      this.onHide();
    } else {
      this.msgs = [];
      if(this.Type == 'kegiatan'){
        this.msgs.push({ severity: 'warn', summary: 'Peringatan', detail: 'Pilih Kegiatan' });
      } else {
        this.msgs.push({ severity: 'warn', summary: 'Peringatan', detail: 'Pilih Sub Kegiatan' });
      }
    }
	}
  onHide(){
    this.msgs = [];
		this.dataselected = undefined;
		this.showThis = false;
    this.title = '';
  }
}
