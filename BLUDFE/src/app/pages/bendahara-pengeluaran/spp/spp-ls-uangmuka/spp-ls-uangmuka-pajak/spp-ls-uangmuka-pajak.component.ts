import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISpp } from 'src/app/core/interface/ispp';
import { ISppdetr } from 'src/app/core/interface/isppdetr';
import { ISppdetrp } from 'src/app/core/interface/isppdetrp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { SppdetrpService } from 'src/app/core/services/sppdetrp.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { SppLsUangmukaPajakFormComponent } from '../spp-ls-uangmuka-pajak-form/spp-ls-uangmuka-pajak-form.component';

@Component({
  selector: 'app-spp-ls-uangmuka-pajak',
  templateUrl: './spp-ls-uangmuka-pajak.component.html',
  styleUrls: ['./spp-ls-uangmuka-pajak.component.scss']
})
export class SppLsUangmukaPajakComponent implements OnInit, OnDestroy {
  @Input() SppSelected : ISpp;
  tabIndex: number = 0;
  rekeningSelected: ISppdetr;
  subRekeing: Subscription;
  listdata: ISppdetrp[] = [];
  dataSelected: ISppdetrp;
  loading: boolean;
  userInfo: ITokenClaim;
  @ViewChild(SppLsUangmukaPajakFormComponent,{static: true}) Form : SppLsUangmukaPajakFormComponent;
  @ViewChild('dt', {static: false}) dt: any;
  constructor(
    private sppdetrService: SppdetrService,
    private service: SppdetrpService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.subRekeing = this.sppdetrService._dataSelected.subscribe(resp => {
      this.rekeningSelected = resp;
      this.get();
    });
  }

  ngOnInit() {
  }
  get(){
    if(this.rekeningSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.rekeningSelected.idsppdetr)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = resp;
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
        }, (error) => {
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
  onChangeTab(e: any){
	}
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idsppdetrp === e.data.idsppdetrp);
      this.listdata = this.listdata.filter(f => f.idsppdetrp != e.data.idsppdetrp);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  add(){
    if(this.rekeningSelected){
      this.Form.title = 'Tambah';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idsppdetr: this.rekeningSelected.idsppdetr
      });
      this.Form.showThis = true;
    }
  }
  update(e: ISppdetrp){
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idsppdetrp :  e.idsppdetrp,
      idsppdetr :  e.idsppdetr,
      idpajak :  e.idpajak,
      nilai :  e.nilai,
      keterangan :  e.keterangan,
      idbilling :  e.idbilling,
      tglbilling :  e.tglbilling !== null ? new Date(e.tglbilling) : new Date(),
      ntpn :  e.ntpn,
      ntb :  e.ntb,
    });
    if(e.idpajakNavigation){
      this.Form.uiPajak = {kode : e.idpajakNavigation.kdpajak, nama: e.idpajakNavigation.nmpajak};
      this.Form.pajakSelected = e.idpajakNavigation;
    }
    this.Form.isvalid = this.SppSelected.valid;
    this.Form.showThis = true;
  }
  delete(e: ISppdetrp){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idsppdetrp).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idsppdetrp !== e.idsppdetrp);
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
    this.subRekeing.unsubscribe();
  }
}
