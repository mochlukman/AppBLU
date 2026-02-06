import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBkutbpspjtr } from 'src/app/core/interface/ibkutbpspjtr';
import { ISpjtr } from 'src/app/core/interface/ispjtr';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BkutbpspjtrService } from 'src/app/core/services/bkutbpspjtr.service';
import { SpjtrDetailService } from 'src/app/core/services/spjtr-detail.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { SpjBkuPenerimaanFormComponent } from '../spj-bku-penerimaan-form/spj-bku-penerimaan-form.component';

@Component({
  selector: 'app-spj-bku-penerimaan',
  templateUrl: './spj-bku-penerimaan.component.html',
  styleUrls: ['./spj-bku-penerimaan.component.scss']
})
export class SpjBkuPenerimaanComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  @Input() spjtrSelected: ISpjtr;
  userInfo: ITokenClaim;
  indexSubs : Subscription;
  index: number;
  listdata: IBkutbpspjtr[] = [];
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(SpjBkuPenerimaanFormComponent, {static: true}) Form : SpjBkuPenerimaanFormComponent;
  constructor(
    private spjtrdetail : SpjtrDetailService,
    private service : BkutbpspjtrService,
    private notif: NotifService,
    private auth : AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.indexSubs = this.spjtrdetail._tabIndex.subscribe(resp => {
      this.index = resp;
      if(this.index == 0){
        this.get();
      } else {
        this.listdata = [];
      }
    });
   }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.spjtrSelected.currentValue){
      this.get();
    }
  }
  get(){
    if(this.spjtrSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.spjtrSelected.idspjtr)
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
    this.Form.title = 'Tambah BKU Penerimaan';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idunit : this.spjtrSelected.idunit,
      idbend : this.spjtrSelected.idbend,
      idspjtr: this.spjtrSelected.idspjtr
    });
    this.Form.showThis = true;
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    }
  }
  delete(e: IBkutbpspjtr){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idbkutbpspjtr).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idbkutbpspjtr !== e.idbkutbpspjtr);
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
    this.spjtrSelected = null;
    this.indexSubs.unsubscribe();
  }
}
