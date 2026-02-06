import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILookupTree } from 'src/app/core/interface/iglobal';
import { ISpp } from 'src/app/core/interface/ispp';
import { ISppdetr } from 'src/app/core/interface/isppdetr';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormSppDetailLsNonpegawaiComponent } from '../../form-spp-detail-ls-nonpegawai/form-spp-detail-ls-nonpegawai.component';

@Component({
  selector: 'app-detail-ls-nonpegawai-pembebanan',
  templateUrl: './detail-ls-nonpegawai-pembebanan.component.html',
  styleUrls: ['./detail-ls-nonpegawai-pembebanan.component.scss']
})
export class DetailLsNonpegawaiPembebananComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: ISppdetr[] = [];
  @Input() SppSelected : ISpp;
  @Input() KegSelected : ILookupTree;
  userInfo: ITokenClaim;
  @ViewChild(FormSppDetailLsNonpegawaiComponent, {static: true}) Form : FormSppDetailLsNonpegawaiComponent;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: ISppdetr;
  subDataSelected: Subscription;
  constructor(
    private service: SppdetrService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.subDataSelected = this.service._dataSelected.subscribe(resp => {
      this.dataSelected = resp;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.KegSelected;
    this.SppSelected;
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
      let index = this.listdata.findIndex(f => f.idsppdetr === e.data.idsppdetr);
      this.listdata = this.listdata.filter(f => f.idsppdetr != e.data.idsppdetr);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }

  subTotal1(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.totspd);
    }
    return total;
  }
  subTotal2(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.totspp);
    }
    return total;
  }
  subTotal3(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  subTotal4(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.sisa);
    }
    return total;
  }
  get(){
    if(this.SppSelected && this.KegSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.SppSelected.idspp, this.KegSelected.data_id)
        .subscribe(resp => {
          this.listdata = [...resp];
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
    this.Form.title = 'Tambah';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idspp : this.SppSelected.idspp,
      idspd : this.SppSelected.idspd,
      idunit: this.SppSelected.idunit,
      idkeg: this.KegSelected.data_id
    });
    if(this.listdata.length > 0){
      this.Form.listRekExist = this.listdata.map(m => m.idrek);
    }
    this.Form.isvalid = this.SppSelected.valid;
    this.Form.showThis = true;
  }
  update(e: ISppdetr){
    this.Form.forms.patchValue({
      idsppdetr : e.idsppdetr,
      idrek : e.idrek,
      idkeg : e.idkeg,
      idspp : e.idspp,
      idnojetra : e.idnojetra,
      nilai : e.nilai,
      idspd : this.SppSelected.idspd,
      idjdana: e.idjdana
    });
    if(e.idjdanaNavigation){
      this.Form.jdanaSelected = e.idjdanaNavigation;
      this.Form.uiJdana = {kode: e.idjdanaNavigation.kddana, nama: e.idjdanaNavigation.nmdana};
    }
    if(e.idrekNavigation){
      this.Form.rekeningSelected = e.idrekNavigation;
      this.Form.uiRekening = {kode: e.idrekNavigation.kdper.trim(), nama: e.idrekNavigation.nmper.trim()};
    }
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.isvalid = this.SppSelected.valid;
    this.Form.showThis = true;
  }
  delete(e: ISppdetr){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idsppdetr).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idsppdetr !== e.idsppdetr);
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
  dataKlick(e: ISppdetr){
    this.service.setDataSelected(e);
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
    this.SppSelected = null;
    this.KegSelected = null;
    this.service.setDataSelected(null);
    this.subDataSelected.unsubscribe();
  }
}
