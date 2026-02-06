import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISpm } from 'src/app/core/interface/ispm';
import { Ispmdetb } from 'src/app/core/interface/ispmdetb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpmdetbService } from 'src/app/core/services/spmdetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { PembiayaanPengajuanPembebananFormComponent } from '../pembiayaan-pengajuan-pembebanan-form/pembiayaan-pengajuan-pembebanan-form.component';

@Component({
  selector: 'app-pembiayaan-pengajuan-pembebanan',
  templateUrl: './pembiayaan-pengajuan-pembebanan.component.html',
  styleUrls: ['./pembiayaan-pengajuan-pembebanan.component.scss']
})
export class PembiayaanPengajuanPembebananComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: Ispmdetb[] = [];
  @Input() spmSelected : ISpm;
  userInfo: ITokenClaim;
  @ViewChild(PembiayaanPengajuanPembebananFormComponent, {static: true}) Form : PembiayaanPengajuanPembebananFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : Subscription;
  index: number;
  constructor(
    private service: SpmdetbService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.indexSubs = this.service._tabIndex.subscribe(resp => {
      this.index = resp;
      if(this.index == 0){
        this.get();
      } else {
        this.listdata = [];
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.spmSelected){
      if(changes.spmSelected.previousValue){
        if(changes.spmSelected.currentValue.idspm != changes.spmSelected.previousValue.idspm){
          this.get();
          }
      } else {
        this.get();
      }      
    }
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idspmdetb === e.data.idspmdetb);
      this.listdata = this.listdata.filter(f => f.idspmdetb != e.data.idspmdetb);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.spmSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.spmSelected.idspm)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          
          this.loading = false;
        },(error) => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(var i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    }
  }
  add(){
    this.Form.title = 'Tambah Rekening Rincian';
    this.Form.mode = 'add';
    this.Form.spmSelected = this.spmSelected;
    this.Form.forms.patchValue({
      idspm : this.spmSelected.idspm,
      idunit: this.spmSelected.idunit
    });
    this.Form.showThis = true;
  }
  update(e: Ispmdetb){
    this.Form.forms.patchValue({
      idspmdetb : e.idspmdetb,
      idrek : e.idrek,
      idtspm : e.idspm,
      idnojetra : e.idnojetra,
      nilai : e.nilai
    });
    this.Form.title = 'Ubah Nilai';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: Ispmdetb){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idspmdetb).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idspmdetb !== e.idspmdetb);
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
  ngOnDestroy(): void {
    this.listdata = [];
    this.spmSelected = null;
    this.indexSubs.unsubscribe();
  }
}