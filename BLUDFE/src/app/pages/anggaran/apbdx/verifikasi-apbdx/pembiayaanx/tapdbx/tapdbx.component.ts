import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import { IRkab } from 'src/app/core/interface/irkab';
import { IRkatapdb } from 'src/app/core/interface/irkatapdb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { RkatapdbService } from 'src/app/core/services/rkatapdb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { TapdbFormxComponent } from './tapdb-formx/tapdb-formx.component';

@Component({
  selector: 'app-tapdbx',
  templateUrl: './tapdbx.component.html',
  styleUrls: ['./tapdbx.component.scss']
})
export class TapdbxComponent implements OnInit {
  showThis: boolean;
  title: string = '';
  loading: boolean = false;
  rkaSelected: IRkab = null;
  totalRecords: number = 0;
  listdata: IRkatapdb[] = [];
  msg: Message[];
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild(TapdbFormxComponent, {static: true}) Form : TapdbFormxComponent;
  constructor(
    private service: RkatapdbService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }

  ngOnInit() {
  }
  gets(event: LazyLoadEvent){
    if(this.rkaSelected){
      this.loading = true;
      this.listdata = [];
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idrka = this.rkaSelected.idrkab
      this.service.paging().subscribe(resp => {
        if (resp.totalrecords > 0) {
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
        this.loading = false;
      }, error => {
        this.loading = false;
        if (Array.isArray(error.error.error)) {
          for (var i = 0; i < error.error.error.length; i++) {
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
  }
  callback(e: any){
    if(e.added){
      if(this.dt) this.dt.reset();
      this.msg = [];
      this.msg.push({severity: 'success', summary: 'success', detail: 'Data Berhasil Ditambahkan'});
    } else if(e.edited){
      if(typeof e.data === 'object' && e.data !== null){
        this.listdata.map(m => {
          if(m.idtapdb == e.data.idtapdb){
            m.nomor = e.data.nomor;
            m.nippeg = e.data.nippeg;
            m.namapeg = e.data.namapeg;
            m.verifikasi = e.data.verifikasi;
            m.keterangan = e.data.keterangan;
            m.tanggal = e.data.tanggal;
          }
        });
      }
      this.msg = [];
      this.msg.push({severity: 'success', summary: 'success', detail: 'Data Berhasil Diubah'});
    }
  }
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idrka: this.rkaSelected.idrkab,
      idunit: this.rkaSelected.idunit
    });
    this.Form.showThis = true;
  }
  update(e: IRkatapdb){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idtapd: e.idtapdb,
      idrka: e.idrkab,
      idpeg: e.idpeg,
      nomor: e.nomor,
      verifikasi: e.verifikasi,
      tanggal: e.tanggal != null ? new Date(e.tanggal) : null,
      keterangan: e.keterangan,
      idunit: this.rkaSelected.idunit,
    });
    if(e.idpegNavigation){
      this.Form.uiTapd = {kode : e.idpegNavigation.nip, nama: e.idpegNavigation.nama};
      this.Form.tapdSelected = e.idpegNavigation;
    }
    this.Form.showThis = true;
  }
  delete(e: IRkatapdb){
    this.notif.confir({
			message: `${e.nippeg} - ${e.namapeg} Akan Dihapus`,
			accept: () => {
				this.service.delete(e.idtapdb).subscribe(
					(resp) => {
						if (resp.ok) {
              if(this.dt) this.dt.reset();
              this.msg = [];
              this.msg.push({severity: 'success', summary: 'success', detail: 'Data Berhasil Dihapus'});
						}
					}, (error) => {
            if(Array.isArray(error.error.error)){
              this.msg = [];
              for(var i = 0; i < error.error.error.length; i++){
                this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
              }
            } else {
              this.msg = [];
              this.msg.push({severity: 'error', summary: 'error', detail: error.error});
            }    
          });
			},
			reject: () => {
				return false;
			}
		});
  }
  onShow(event: LazyLoadEvent){
    this.gets(event);
  }
  onHide(){
    this.rkaSelected = null;
    this.listdata = [];
    this.loading = false;
    this.msg = [];
    this.showThis = false;
  }
}
