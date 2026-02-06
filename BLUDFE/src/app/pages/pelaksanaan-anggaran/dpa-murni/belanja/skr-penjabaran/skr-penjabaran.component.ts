import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IDpadetr } from 'src/app/core/interface/idpadetr';
import { IDpar } from 'src/app/core/interface/idpar';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpadetrService } from 'src/app/core/services/dpadetr.service';
import { DparService } from 'src/app/core/services/dpar.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormSkrPenjabaranComponent } from './form-skr-penjabaran/form-skr-penjabaran.component';

@Component({
  selector: 'app-skr-penjabaran',
  templateUrl: './skr-penjabaran.component.html',
  styleUrls: ['./skr-penjabaran.component.scss']
})
export class SkrPenjabaranComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  @Input() rekSelected: IDpar;
  loading: boolean = false;
  listdata: IDpadetr[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dtpenjabaran', {static: true}) dt: any;
  @ViewChild(FormSkrPenjabaranComponent,{static: true}) formJabar : FormSkrPenjabaranComponent;
  constructor(
    private service: DpadetrService,
    private service_rek: DparService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
   if(this.tabIndex == 0){
     this.get();
   } else {
     this.listdata = [];
   }
  }

  ngOnInit() {
  }
  get(){
    if(this.rekSelected && this.tabIndex == 0){
      this.loading = true;
      this.listdata = [];
      if(this.dt) this.dt.reset();
      this.service.gets(this.rekSelected.iddpar)
        .subscribe(resp => {
          this.listdata = [];
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Penjabaran Tidak Tersedia');
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
  callBack(e: any){
    if(e.added){
      if(e.data.iddpadetrduk !== 0){
        let parent = this.listdata.filter(f => f.iddpadetrduk === e.data.iddpadetrduk);
        if(parent.length > 0){
          let index_parent = this.listdata.findIndex(f => f.iddpadetr === parent[parent.length - 1].iddpadetr);
          this.listdata.splice(index_parent + 1, 0, e.data);
        } else {
          let index_induk = this.listdata.findIndex(f => f.iddpadetr === e.data.iddpadetrduk);
          this.listdata.splice(index_induk+1, 0, e.data);
        }
      } else {
        this.listdata.push(e.data);
      }
      this.listdata.map(m => {
        if(m.iddpadetr === e.data.iddpadetrduk){
          m.type = 'H';
        }
      });
      this.updateNilaiInduk(e.data);
    } else {
      let index = this.listdata.findIndex(f => f.iddpadetr === e.data.iddpadetr);
      this.listdata = this.listdata.filter(f => f.iddpadetr != e.data.iddpadetr);
      this.listdata.splice(index, 0, e.data);
      if(e.data.type.trim() == 'D') this.updateNilaiInduk(e.data);
    }
    this.listdata.sort((a,b) =>  (a.kdjabar.trim() > b.kdjabar.trim() ? 1 : -1));
    this.updateNilaiRek();
    if(this.dt) this.dt.reset();
  }
  updateNilaiInduk(e: IDpadetr){
    if(this.listdata.length > 0){
      let totals: number = 0;
      this.listdata.forEach(f => {
        if(f.iddpadetrduk == e.iddpadetrduk){
          totals += f.subtotal;
        }
      });
      this.listdata.map(m => {
        if(m.iddpadetr == e.iddpadetrduk){
          m.subtotal = totals;
        }
      });
      let data: IDpadetr = this.listdata.find(f => f.iddpadetr === e.iddpadetrduk);
      if(data != null){
        if(data.iddpadetrduk != 0 || data.iddpadetrduk != null) this.updateNilaiInduk(data);
      }
    }
  }
  updateNilaiRek(){
    let totals: number = 0;
    this.listdata.forEach(f => {
      if(f.iddpadetrduk == 0 || f.iddpadetrduk == null){
        totals += f.subtotal;
      }
    });
    this.service_rek.setNilaiRek(totals);
  }
  add(){
    this.formJabar.title = 'Tambah Data';
    this.formJabar.mode = 'add';
    this.formJabar.forms.patchValue({
      iddpar: this.rekSelected.iddpar
    });
    this.formJabar.showThis = true;
  }
  addChild(e: IDpadetr){
    this.formJabar.title = 'Tambah Sub Data';
    this.formJabar.mode = 'add';
    this.formJabar.kode_induk = e.kdjabar;
    this.formJabar.forms.patchValue({
      iddpar: this.rekSelected.iddpar,
      iddpadetrduk: e.iddpadetr
    });
    this.formJabar.showThis = true;
  }
  edit(e: IDpadetr){
    this.formJabar.title = 'Ubah Data';
    this.formJabar.mode = 'edit';
    if(e.jsatuan != null){
      this.formJabar.uiSatuan = {kode: e.jsatuan.kdsatuan, nama: e.jsatuan.uraisatuan};
    }
    this.formJabar.forms.patchValue({
      iddpar: e.iddpar,
			iddpadetr: e.iddpadetr,
			iddpadetrduk: e.iddpadetrduk,
      kdjabar: e.kdjabar,
			uraian: e.uraian,
      idsatuan: e.idsatuan,
      satuan: e.satuan,
			tarif: e.tarif,
			type: e.type ? e.type.trim() : '',
			ekspresi: e.ekspresi,
    });
    this.formJabar.isHeader = (e.type ? e.type.trim() : '') === 'H' ? true : false;
    this.formJabar.showThis = true;
  }
  delete(e: IDpadetr){
    this.notif.confir({
			message: '',
			accept: () => {
				this.service.delete(e.iddpadetr).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.iddpadetr !== e.iddpadetr);
              this.listdata.sort((a,b) =>  (a.kdjabar.trim() > b.kdjabar.trim() ? 1 : -1));
              this.updateNilaiInduk(e);
              this.updateNilaiRek();
              this.notif.success('Data berhasil dihapus');
              this.dt.reset();
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
  ngOnDestroy():void{
    this.listdata = [];
    this.rekSelected = null;
  }
}
