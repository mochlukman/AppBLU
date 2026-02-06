import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDpab } from 'src/app/core/interface/idpab';
import { IDpadetb } from 'src/app/core/interface/idpadetb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpabService } from 'src/app/core/services/dpab.service';
import { DpadetbService } from 'src/app/core/services/dpadetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormSkbPenjabaranComponent } from './form-skb-penjabaran/form-skb-penjabaran.component';

@Component({
  selector: 'app-skb-penjabaran',
  templateUrl: './skb-penjabaran.component.html',
  styleUrls: ['./skb-penjabaran.component.scss']
})
export class SkbPenjabaranComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  @Input() rekSelected: IDpab;
  loading: boolean = false;
  listdata: IDpadetb[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static: true}) dt: any;
  @ViewChild(FormSkbPenjabaranComponent,{static: true}) formJabar : FormSkbPenjabaranComponent;
  constructor(
    private service: DpadetbService,
    private service_rek: DpabService,
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
      this.service.gets(this.rekSelected.iddpab)
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
      if(e.data.iddpadetbduk !== 0){
        let parent = this.listdata.filter(f => f.iddpadetbduk === e.data.iddpadetbduk);
        if(parent.length > 0){
          let index_parent = this.listdata.findIndex(f => f.iddpadetb === parent[parent.length - 1].iddpadetb);
          this.listdata.splice(index_parent + 1, 0, e.data);
        } else {
          let index_induk = this.listdata.findIndex(f => f.iddpadetb === e.data.iddpadetbduk);
          this.listdata.splice(index_induk+1, 0, e.data);
        }
      } else {
        this.listdata.push(e.data);
      }
      this.listdata.map(m => {
        if(m.iddpadetb === e.data.iddpadetbduk){
          m.type = 'H';
        }
      });
      this.updateNilaiInduk(e.data);
    } else {
      let index = this.listdata.findIndex(f => f.iddpadetb === e.data.iddpadetb);
      this.listdata = this.listdata.filter(f => f.iddpadetb != e.data.iddpadetb);
      this.listdata.splice(index, 0, e.data);
      if(e.data.type.trim() == 'D') this.updateNilaiInduk(e.data);
    }
    this.listdata.sort((a,b) =>  (a.kdjabar.trim() > b.kdjabar.trim() ? 1 : -1));
    this.updateNilaiRek();
    if(this.dt) this.dt.reset();
  }
  updateNilaiInduk(e: IDpadetb){
    if(this.listdata.length > 0){
      let totals: number = 0;
      this.listdata.forEach(f => {
        if(f.iddpadetbduk == e.iddpadetbduk){
          totals += f.subtotal;
        }
      });
      this.listdata.map(m => {
        if(m.iddpadetb == e.iddpadetbduk){
          m.subtotal = totals;
        }
      });
      let data: IDpadetb = this.listdata.find(f => f.iddpadetb === e.iddpadetbduk);
      if(data != null){
        if(data.iddpadetbduk != 0 || data.iddpadetbduk != null) this.updateNilaiInduk(data);
      }
    }
  }
  updateNilaiRek(){
    let totals: number = 0;
    this.listdata.forEach(f => {
      if(f.iddpadetbduk == 0 || f.iddpadetbduk == null){
        totals += f.subtotal;
      }
    });
    this.service_rek.setNilaiRek(totals);
  }
  add(){
    this.formJabar.title = 'Tambah';
    this.formJabar.mode = 'add';
    this.formJabar.forms.patchValue({
      iddpab: this.rekSelected.iddpab
    });
    this.formJabar.showThis = true;
  }
  addChild(e: IDpadetb){
    this.formJabar.title = 'Tambah';
    this.formJabar.mode = 'add';
    this.formJabar.kode_induk = e.kdjabar;
    this.formJabar.forms.patchValue({
      iddpab: this.rekSelected.iddpab,
      iddpadetbduk: e.iddpadetb
    });
    this.formJabar.showThis = true;
  }
  edit(e: IDpadetb){
    this.formJabar.title = 'Ubah';
    this.formJabar.mode = 'edit';
    if(e.jsatuan != null){
      this.formJabar.uiSatuan = {kode: e.jsatuan.kdsatuan, nama: e.jsatuan.uraisatuan};
    }
    this.formJabar.forms.patchValue({
      iddpab: e.iddpab,
			iddpadetb: e.iddpadetb,
			iddpadetbduk: e.iddpadetbduk,
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
  delete(e: IDpadetb){
    this.notif.confir({
			message: '',
			accept: () => {
				this.service.delete(e.iddpadetb).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.iddpadetb !== e.iddpadetb);
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

