import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IBpk } from 'src/app/core/interface/ibpk';
import { IBpkpajak } from 'src/app/core/interface/ibpkpajak';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkpajakService } from 'src/app/core/services/bpkpajak.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { PembuatanBpkPungutanPajakDetComponent } from './pembuatan-bpk-pungutan-pajak-det/pembuatan-bpk-pungutan-pajak-det.component';
import { PembuatanBpkPungutanPajakFormComponent } from './pembuatan-bpk-pungutan-pajak-form/pembuatan-bpk-pungutan-pajak-form.component';
import {LookPungutanPajakViewComponent} from 'src/app/shared/lookups/look-pungutan-pajak-view/look-pungutan-pajak-view.component';

@Component({
  selector: 'app-pembuatan-bpk-pungutan-pajak',
  templateUrl: './pembuatan-bpk-pungutan-pajak.component.html',
  styleUrls: ['./pembuatan-bpk-pungutan-pajak.component.scss']
})
export class PembuatanBpkPungutanPajakComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0
  loading: boolean;
  listdata: IBpkpajak[] = [];
  @Input() bpkSelected : IBpk;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: IBpkpajak;
  kdtatus: string = '35';
  @ViewChild(PembuatanBpkPungutanPajakFormComponent, {static: true}) Form: PembuatanBpkPungutanPajakFormComponent;
  @ViewChild(PembuatanBpkPungutanPajakDetComponent, {static: true}) Bpkdet: PembuatanBpkPungutanPajakDetComponent;
  @ViewChild(LookPungutanPajakViewComponent, {static: true}) BpkPajak: LookPungutanPajakViewComponent;
  constructor(
    private service: BpkpajakService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bpkSelected) {
      if (changes.bpkSelected.firstChange && changes.bpkSelected.currentValue) {
        if(this.tabIndex == 1){
          this.gets();
        } else {
          this.ngOnDestroy();
        }

      } else {
        if (changes.bpkSelected.currentValue != changes.bpkSelected.previousValue) {
          if(this.tabIndex == 1){
            this.gets();
          } else {
            this.ngOnDestroy();
          }
        }
      }
    } else if(this.tabIndex == 1){
      this.gets();
    }
  }
  ngOnInit() {
  }
  gets(){
    if(this.bpkSelected && this.tabIndex == 1){
      this.loading = true;
      this.listdata = [];
      this.dataSelected = null;
      this.service._idbpk = this.bpkSelected.idbpk;
      this.service._kdstatus = this.kdtatus;
      this.service.gets().subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
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
      this.listdata.push(e.data);
    } else if(e.edited){
      this.listdata.splice(this.listdata.findIndex(i => i.idbpkpajak === e.data.idbpkpajak), 1, e.data);
    }
  }
  callbackdet(e: any){
    this.listdata.map(m => {
      if(m.idbpkpajak == e.idbpkpajak){
        m.nilai = e.nilai;
      }
    });
  }
  viewDataPajak(){
    this.BpkPajak.title = 'Data Pemungutan Pajak';
    this.BpkPajak.gets();
    this.BpkPajak.showThis = true;
  }
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idbpk : this.bpkSelected.idbpk
    });
    this.Form.showThis = true;
  }
  edit(e: IBpkpajak){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idbpkpajak : e.idbpkpajak,
      idbpk : e.idbpk,
      uraian : e.uraian,
      nomor : e.nomor,
      tanggal :e.tanggal ? new Date(e.tanggal) : null,
      kdstatus : e.kdstatus.trim()
    });
    this.Form.showThis = true;
  }
  delete(e: IBpkpajak){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idbpkpajak).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idbpkpajak !== e.idbpkpajak);
              this.notif.success('Data berhasil dihapus');
              if(this.dt) this.dt.reset();
						}
					}, (error) => {
            if(Array.isArray(error.error.error)){
              for(var i = 0; i < error.error.error.length; i++){
                this.notif.error(error.error.error[i]);
              }
            } else {
              this.notif.error(error.error);
            }
          });
			},
			reject: () => {
				return false;
			}
		});
  }
  dataClick(e: IBpkpajak){
    this.dataSelected = e;
    this.Bpkdet.title = `Rincian Pungutan Pajak`;
    this.Bpkdet.BpkpajakSelected = this.dataSelected;
    this.Bpkdet.showThis = true;
  }
  subTotal(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.dataSelected = null;
  }
}
