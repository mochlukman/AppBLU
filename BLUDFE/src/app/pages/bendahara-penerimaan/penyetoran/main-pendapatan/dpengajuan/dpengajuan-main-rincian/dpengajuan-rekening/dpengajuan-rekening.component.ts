import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISts } from 'src/app/core/interface/ists';
import { IStsdetd } from 'src/app/core/interface/istsdetd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsdetdService } from 'src/app/core/services/stsdetd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { DPengajuanRekeningFormComponent } from '../dpengajuan-rekening-form/dpengajuan-rekening-form.component';

@Component({
  selector: 'app-dpengajuan-rekening',
  templateUrl: './dpengajuan-rekening.component.html',
  styleUrls: ['./dpengajuan-rekening.component.scss']
})
export class DPengajuanRekeningComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: IStsdetd[] = [];
  @Input() StsSelected : ISts;
  userInfo: ITokenClaim;
  @ViewChild(DPengajuanRekeningFormComponent, {static: true}) Form : DPengajuanRekeningFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  group1: boolean;
  group2: boolean;
  constructor(
    private service: StsdetdService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.group1 = false;
    this.group2 = false;
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.StsSelected && this.tabIndex == 1){
      if(['16'].indexOf(this.StsSelected.kdstatus.trim()) > -1){
        this.group1 = true;
        this.group2 = false;
      }
      if(['60','61','63','64'].indexOf(this.StsSelected.kdstatus.trim()) > -1){
        this.group1 = false;
        this.group2 = true;
      }
      this.get();
    }
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idstsdetd === e.data.idstsdetd);
      this.listdata = this.listdata.filter(f => f.idstsdetd != e.data.idstsdetd);
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
  update(e: IStsdetd){
    this.Form.forms.patchValue({
      idstsdetd : e.idstsdetd,
      idrek : e.idrek,
      idtsts : e.idsts,
      idnojetra : e.idnojetra,
      nilai : e.nilai
    });
    this.Form.title = 'Ubah Nilai';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IStsdetd){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idstsdetd).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idstsdetd !== e.idstsdetd);
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
  subTotal(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.StsSelected = null;
  }
}
