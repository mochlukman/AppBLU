import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISts } from 'src/app/core/interface/ists';
import { IStsdetb } from 'src/app/core/interface/istsdetb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsdetbService } from 'src/app/core/services/stsdetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { BpengajuanRekeningFormComponent } from '../bpengajuan-rekening-form/bpengajuan-rekening-form.component';

@Component({
  selector: 'app-bpengajuan-rekening',
  templateUrl: './bpengajuan-rekening.component.html',
  styleUrls: ['./bpengajuan-rekening.component.scss']
})
export class BpengajuanRekeningComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: IStsdetb[] = [];
  @Input() StsSelected : ISts;
  userInfo: ITokenClaim;
  @ViewChild(BpengajuanRekeningFormComponent, {static: true}) Form : BpengajuanRekeningFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : Subscription;
  index: number;
  constructor(
    private service: StsdetbService,
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
    if(changes.StsSelected){
      if(changes.StsSelected.previousValue){
        if(changes.StsSelected.currentValue.idsts != changes.StsSelected.previousValue.idsts){
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
      let index = this.listdata.findIndex(f => f.idstsdetb === e.data.idstsdetb);
      this.listdata = this.listdata.filter(f => f.idstsdetb != e.data.idstsdetb);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.StsSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.StsSelected.idsts)
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
    this.Form.forms.patchValue({
      idsts : this.StsSelected.idsts,
      idunit: this.StsSelected.idunit
    });
    this.Form.showThis = true;
  }
  update(e: IStsdetb){
    this.Form.forms.patchValue({
      idstsdetb : e.idstsdetb,
      idrek : e.idrek,
      idsts : e.idsts,
      idnojetra : e.idnojetra,
      nilai : e.nilai
    });
    this.Form.title = 'Ubah Nilai';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IStsdetb){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idstsdetb).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idstsdetb !== e.idstsdetb);
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
    this.StsSelected = null;
    this.indexSubs.unsubscribe();
  }
}
