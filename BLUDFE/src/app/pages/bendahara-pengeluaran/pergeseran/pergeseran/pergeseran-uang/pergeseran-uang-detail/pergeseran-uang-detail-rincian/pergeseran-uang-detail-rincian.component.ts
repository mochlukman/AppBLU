import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBkbank } from 'src/app/core/interface/ibkbank';
import { IBkbankdet } from 'src/app/core/interface/ibkbankdet';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BkbankdetService } from 'src/app/core/services/bkbankdet.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { PergeseranUangDetailRincianFormComponent } from '../pergeseran-uang-detail-rincian-form/pergeseran-uang-detail-rincian-form.component';

@Component({
  selector: 'app-pergeseran-uang-detail-rincian',
  templateUrl: './pergeseran-uang-detail-rincian.component.html',
  styleUrls: ['./pergeseran-uang-detail-rincian.component.scss']
})
export class PergeseranUangDetailRincianComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: IBkbankdet[] = [];
  @Input() BkbankSelected : IBkbank;
  userInfo: ITokenClaim;
  @ViewChild(PergeseranUangDetailRincianFormComponent, {static: true}) Form : PergeseranUangDetailRincianFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: IBkbankdet;
  subDataSelected: Subscription;
  constructor(
    private service: BkbankdetService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.subDataSelected = this.service._dataSelected.subscribe(resp => {
      this.dataSelected = resp;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.BkbankSelected;
    if(this.tabIndex == 0){
      this.get();
    } else {
      this.listdata = [];
    }
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idbankdet === e.data.idbankdet);
      this.listdata = this.listdata.filter(f => f.idbankdet != e.data.idbankdet);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.BkbankSelected && this.tabIndex == 0){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.BkbankSelected.idbkbank)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
          this.service.setDataSelected(null);
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
    this.Form.title = 'Tambah Rincian Pergeseran';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idbkbank: this.BkbankSelected.idbkbank
    });
    this.Form.showThis = true;
  }
  update(e: IBkbankdet){
    this.Form.forms.patchValue({
      idbankdet : e.idbankdet,
      idbkbank : e.idbkbank,
      nilai : e.nilai
    });
    this.Form.title = 'Ubah Nilai';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IBkbankdet){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idbankdet).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idbankdet !== e.idbankdet);
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
  dataKlick(e: IBkbankdet){
    this.service.setDataSelected(e);
	}
  ngOnDestroy(): void {
    this.listdata = [];
    this.BkbankSelected = null;
    this.service.setDataSelected(null);
    this.subDataSelected.unsubscribe();
  }
}
