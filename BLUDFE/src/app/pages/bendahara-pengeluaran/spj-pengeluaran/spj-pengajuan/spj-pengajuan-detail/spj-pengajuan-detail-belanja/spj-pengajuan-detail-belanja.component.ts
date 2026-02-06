import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IBpkSpj } from 'src/app/core/interface/ibpk-spj';
import { ISpj } from 'src/app/core/interface/ispj';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkSpjService } from 'src/app/core/services/bpk-spj.service';
import { SpjDetailService } from 'src/app/core/services/spj-detail.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { SpjPengajuanDetailBelanjaFormComponent } from '../spj-pengajuan-detail-belanja-form/spj-pengajuan-detail-belanja-form.component';
import { SpjPengajuanDetailBelanjaRincianComponent } from '../spj-pengajuan-detail-belanja-rincian/spj-pengajuan-detail-belanja-rincian.component';

@Component({
  selector: 'app-spj-pengajuan-detail-belanja',
  templateUrl: './spj-pengajuan-detail-belanja.component.html',
  styleUrls: ['./spj-pengajuan-detail-belanja.component.scss']
})
export class SpjPengajuanDetailBelanjaComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  @Input() spjSelected: ISpj;
  loading: boolean;
  userInfo: ITokenClaim;
  index: number;
  listdata: IBpkSpj[] = [];
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(SpjPengajuanDetailBelanjaFormComponent, {static: true}) Form : SpjPengajuanDetailBelanjaFormComponent;
  @ViewChild(SpjPengajuanDetailBelanjaRincianComponent, {static: true}) RincianBelanja : SpjPengajuanDetailBelanjaRincianComponent;
  constructor(
    private spjdetail : SpjDetailService,
    private service : BpkSpjService,
    private notif: NotifService,
    private auth : AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
   }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 0){
      this.get();
    } else {
      this.listdata = [];
      this.ngOnDestroy();
    }
  }
  get(){
    if(this.spjSelected && this.tabIndex == 0){
      this.loading = true;
      this.listdata = [];
      this.service.gets('spj', this.spjSelected.idspj)
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
    this.Form.title = 'Tambah Rincian Belanja';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idspj : this.spjSelected.idspj,
      idunit : this.spjSelected.idunit,
      kdstatus : this.spjSelected.kdstatus.trim() === '42' ? '21' : '23',
      idbend : this.spjSelected.idbend,
      idbpk: ''
    });
    this.Form.showThis = true;
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    }
  }
  delete(e: IBpkSpj){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idbpkspj).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idbpkspj !== e.idbpkspj);
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
  detailBpk(d: IBpkSpj){
    this.RincianBelanja.title = `Rincian Belanja BPK : ${d.idbpkNavigation.nobpk}`;
    this.RincianBelanja.BpkSelected = d.idbpkNavigation;
    this.RincianBelanja.showThis = true;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.spjSelected = null;
  }
}
