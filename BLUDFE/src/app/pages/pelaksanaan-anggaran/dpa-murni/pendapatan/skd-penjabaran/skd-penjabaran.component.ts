import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IDpad } from 'src/app/core/interface/idpad';
import { IDpadetd } from 'src/app/core/interface/idpadetd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpadService } from 'src/app/core/services/dpad.service';
import { DpadetdService } from 'src/app/core/services/dpadetd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormSkdPenjabaranComponent } from './form-skd-penjabaran/form-skd-penjabaran.component';

@Component({
  selector: 'app-skd-penjabaran',
  templateUrl: './skd-penjabaran.component.html',
  styleUrls: ['./skd-penjabaran.component.scss']
})
export class SkdPenjabaranComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  @Input() rekSelected: IDpad;
  loading: boolean = false;
  listdata: IDpadetd[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static: true}) dt: any;
  @ViewChild(FormSkdPenjabaranComponent,{static: true}) formJabar : FormSkdPenjabaranComponent;
  constructor(
    private service: DpadetdService,
    private service_rek: DpadService,
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
      this.service.gets(this.rekSelected.iddpad)
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
      if(e.data.iddpadetdduk !== 0){
        let parent = this.listdata.filter(f => f.iddpadetdduk === e.data.iddpadetdduk);
        if(parent.length > 0){
          let index_parent = this.listdata.findIndex(f => f.iddpadetd === parent[parent.length - 1].iddpadetd);
          this.listdata.splice(index_parent + 1, 0, e.data);
        } else {
          let index_induk = this.listdata.findIndex(f => f.iddpadetd === e.data.iddpadetdduk);
          this.listdata.splice(index_induk+1, 0, e.data);
        }
      } else {
        this.listdata.push(e.data);
      }
      this.listdata.map(m => {
        if(m.iddpadetd === e.data.iddpadetdduk){
          m.type = 'H';
        }
      });
      this.updateNilaiInduk(e.data);
    } else {
      let index = this.listdata.findIndex(f => f.iddpadetd === e.data.iddpadetd);
      this.listdata = this.listdata.filter(f => f.iddpadetd != e.data.iddpadetd);
      this.listdata.splice(index, 0, e.data);
      if(e.data.type.trim() == 'D') this.updateNilaiInduk(e.data);
    }
    this.listdata.sort((a,b) =>  (a.kdjabar.trim() > b.kdjabar.trim() ? 1 : -1));
    this.updateNilaiRek();
    if(this.dt) this.dt.reset();
  }
  updateNilaiInduk(e: IDpadetd){
    if(this.listdata.length > 0){
      let totals: number = 0;
      this.listdata.forEach(f => {
        if(f.iddpadetdduk == e.iddpadetdduk){
          totals += f.subtotal;
        }
      });
      this.listdata.map(m => {
        if(m.iddpadetd == e.iddpadetdduk){
          m.subtotal = totals;
        }
      });
      let data: IDpadetd = this.listdata.find(f => f.iddpadetd === e.iddpadetdduk);
      if(data != null){
        if(data.iddpadetdduk != 0 || data.iddpadetdduk != null) this.updateNilaiInduk(data);
      }
    }
  }
  updateNilaiRek(){
    let totals: number = 0;
    this.listdata.forEach(f => {
      if(f.iddpadetdduk == 0 || f.iddpadetdduk == null){
        totals += f.subtotal;
      }
    });
    this.service_rek.setNilaiRek(totals);
  }
  add(){
    this.formJabar.title = 'Tambah Data';
    this.formJabar.mode = 'add';
    this.formJabar.forms.patchValue({
      iddpad: this.rekSelected.iddpad
    });
    this.formJabar.showThis = true;
  }
  addChild(e: IDpadetd){
    this.formJabar.title = 'Tambah Sub Data';
    this.formJabar.mode = 'add';
    this.formJabar.kode_induk = e.kdjabar;
    this.formJabar.forms.patchValue({
      iddpad: this.rekSelected.iddpad,
      iddpadetdduk: e.iddpadetd
    });
    this.formJabar.showThis = true;
  }
  edit(e: IDpadetd){
    this.formJabar.title = 'Ubah Data';
    this.formJabar.mode = 'edit';
    if(e.jsatuan != null){
      this.formJabar.uiSatuan = {kode: e.jsatuan.kdsatuan, nama: e.jsatuan.uraisatuan};
    }
    this.formJabar.forms.patchValue({
      iddpad: e.iddpad,
			iddpadetd: e.iddpadetd,
			iddpadetdduk: e.iddpadetdduk,
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
  delete(e: IDpadetd){
    this.notif.confir({
			message: '',
			accept: () => {
				this.service.delete(e.iddpadetd).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.iddpadetd !== e.iddpadetd);
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
