import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import { IRkadetd } from 'src/app/core/interface/irkadetd';
import { IRkatapddetd } from 'src/app/core/interface/irkatapddetd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { RkatapddetdService } from 'src/app/core/services/rkatapddetd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { TapddetdFormxComponent } from './tapddetd-formx/tapddetd-formx.component';

@Component({
  selector: 'app-tapddetdx',
  templateUrl: './tapddetdx.component.html',
  styleUrls: ['./tapddetdx.component.scss']
})
export class TapddetdxComponent implements OnInit {
  showThis: boolean;
  title: string = '';
  loading: boolean = false;
  rkadetSelected: IRkadetd = null;
  totalRecords: number = 0;
  listdata: IRkatapddetd[] = [];
  msg: Message[];
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild(TapddetdFormxComponent, {static: true}) Form : TapddetdFormxComponent;
  idunit: number = 0;
  constructor(
    private service: RkatapddetdService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }

  ngOnInit() {
  }
  gets(event: LazyLoadEvent){
    if(this.rkadetSelected){
      this.loading = true;
      this.listdata = [];
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idrkadet = this.rkadetSelected.idrkadetd
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
          if(m.idtapddetd == e.data.idtapddetd){
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
      idrka: this.rkadetSelected.idrkadetd,
      idunit: this.idunit
    });
    this.Form.showThis = true;
  }
  update(e: IRkatapddetd){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idtapd: e.idtapddetd,
      idrka: e.idrkadetd,
      idpeg: e.idpeg,
      nomor: e.nomor,
      verifikasi: e.verifikasi,
      tanggal: e.tanggal != null ? new Date(e.tanggal) : null,
      keterangan: e.keterangan,
      idunit: this.idunit,
    });
    if(e.idpegNavigation){
      this.Form.uiTapd = {kode : e.idpegNavigation.nip, nama: e.idpegNavigation.nama};
      this.Form.tapdSelected = e.idpegNavigation;
    }
    this.Form.showThis = true;
  }
  delete(e: IRkatapddetd){
    this.notif.confir({
			message: `${e.nippeg} - ${e.namapeg} Akan Dihapus`,
			accept: () => {
				this.service.delete(e.idtapddetd).subscribe(
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
    this.rkadetSelected = null;
    this.listdata = [];
    this.loading = false;
    this.msg = [];
    this.showThis = false;
  }
}
