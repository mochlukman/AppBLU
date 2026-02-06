import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISpp } from 'src/app/core/interface/ispp';
import { ISppdetb } from 'src/app/core/interface/isppdetb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetbService } from 'src/app/core/services/sppdetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormSppDetailPembiayaanComponent } from '../../form-spp-detail-pembiayaan/form-spp-detail-pembiayaan.component';

@Component({
  selector: 'app-detail-spp-pembiyaan-pembebanan',
  templateUrl: './detail-spp-pembiyaan-pembebanan.component.html',
  styleUrls: ['./detail-spp-pembiyaan-pembebanan.component.scss']
})
export class DetailSppPembiyaanPembebananComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: ISppdetb[] = [];
  cols: any[] = [];
  @Input() SppSelected : ISpp;
  userInfo: ITokenClaim;
  @ViewChild(FormSppDetailPembiayaanComponent, {static: true}) Form : FormSppDetailPembiayaanComponent;
  @ViewChild('dt',{static:false}) dt: any;;
  index: number;
  constructor(
    private service: SppdetbService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.cols = [
      {field: 'idrekNavigation.kdper'},
      {field: 'idrekNavigation.nmper'},
      {field: 'totspd'},
      {field: 'nilai'},
      {field: 'sisa'},
      {field: 'pilih'}
    ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.SppSelected;
    if(this.tabIndex == 0) {
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
      let index = this.listdata.findIndex(f => f.idsppdetb === e.data.idsppdetb);
      this.listdata = this.listdata.filter(f => f.idsppdetb != e.data.idsppdetb);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.SppSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.SppSelected.idspp)
        .subscribe(resp => {
          this.listdata = [...resp];
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
    this.Form.title = 'Tambah';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idspp : this.SppSelected.idspp,
      idspd : this.SppSelected.idspd,
      idunit: this.SppSelected.idunit
    });
    if(this.listdata.length > 0){
      this.Form.listRekExist = this.listdata.map(m => m.idrek);
    }
    this.Form.isvalid = this.SppSelected.valid;
    this.Form.showThis = true;
  }
  update(e: ISppdetb){
    this.Form.forms.patchValue({
      idsppdetb : e.idsppdetb,
      idrek : e.idrek,
      idspp : e.idspp,
      idnojetra : e.idnojetra,
      nilai : e.nilai,
      idspd : this.SppSelected.idspd
    });
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.isvalid = this.SppSelected.valid;
    this.Form.showThis = true;
  }
  delete(e: ISppdetb){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idsppdetb).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idsppdetb !== e.idsppdetb);
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
    this.SppSelected = null;
  }
}
