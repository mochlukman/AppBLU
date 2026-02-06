import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDp } from 'src/app/core/interface/idp';
import { IDpdet } from 'src/app/core/interface/idpdet';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpdetService } from 'src/app/core/services/dpdet.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { DaftarPengujiDetailFormComponent } from '../daftar-penguji-detail-form/daftar-penguji-detail-form.component';

@Component({
  selector: 'app-daftar-penguji-detail',
  templateUrl: './daftar-penguji-detail.component.html',
  styleUrls: ['./daftar-penguji-detail.component.scss']
})
export class DaftarPengujiDetailComponent implements OnInit, OnDestroy, OnChanges {
  loading: boolean;
  @Input() dpSelected: IDp;
  userInfo: ITokenClaim;
  index: number;
  listdata: IDpdet[] = [];
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(DaftarPengujiDetailFormComponent, {static: true}) Form : DaftarPengujiDetailFormComponent;
  constructor(
    private service : DpdetService,
    private notif: NotifService,
    private auth : AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
   }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.dpSelected.currentValue){
      this.get();
    }
  }
  get(){
    if(this.dpSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.dpSelected.iddp)
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
    this.Form.title = 'Tambah SP2D';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      iddp : this.dpSelected.iddp,
      idxkode : this.dpSelected.idxkode
    });
    this.Form.showThis = true;
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    }
  }
  delete(e: IDpdet){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.iddpdet).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.iddpdet !== e.iddpdet);
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
    this.dpSelected = null;
  }
}
