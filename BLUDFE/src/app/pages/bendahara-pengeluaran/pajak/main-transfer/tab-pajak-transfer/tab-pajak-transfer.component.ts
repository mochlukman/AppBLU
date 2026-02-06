import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ibend } from 'src/app/core/interface/ibend';
import { IBkpajak } from 'src/app/core/interface/ibkpajak';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BkpajakService } from 'src/app/core/services/bkpajak.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { TabPajakTransferFormComponent } from '../tab-pajak-transfer-form/tab-pajak-transfer-form.component';

@Component({
  selector: 'app-tab-pajak-transfer',
  templateUrl: './tab-pajak-transfer.component.html',
  styleUrls: ['./tab-pajak-transfer.component.scss']
})
export class TabPajakTransferComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IBkpajak[] = [];
  dataSelected: IBkpajak = null;
  indexSubs : Subscription;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild(TabPajakTransferFormComponent, {static: true}) Form: TabPajakTransferFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private auth: AuthenticationService,
    private service: BkpajakService,
    private notif: NotifService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.indexSubs = this.service._tabIndex.subscribe(resp => {
      if(resp === 0){}
    });
  }

  ngOnInit() {
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.dataSelected = null;
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
    this.listdata = [];
  }
  lookBendahara(){
    if(this.unitSelected){
      this.Bendahara.title = 'Pilih Bendahara';
      this.Bendahara.gets(this.unitSelected.idunit,'02,12');
      this.Bendahara.showThis = true;
    } else {
      this.notif.warning('Pilih Unit');
    }
    
  }
  callBackBendahara(e: Ibend){
    this.bendSelected = e;
    this.uiBend = {
      kode: this.bendSelected.idpegNavigation.nip, 
      nama: this.bendSelected.idpegNavigation.nama + ',' + this.bendSelected.jnsbendNavigation.jnsbend.trim() + ' - ' + this.bendSelected.jnsbendNavigation.uraibend.trim()
    };
    this.get();
  }
  get(){
    if(this.unitSelected && this.bendSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.dataSelected = null;
      this.service.gets(this.unitSelected.idunit, this.bendSelected.idbend, '40')
        .subscribe(resp => {
          this.listdata = [];
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
        }, (error) => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    } else {
      this.notif.warning('Pilih Unit Organisasi dan Bendaraha');
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idbkpajak === e.data.idbkpajak);
      this.listdata = this.listdata.filter(f => f.idbkpajak != e.data.idbkpajak);
      this.listdata.splice(index, 0, e.data);
    }
  }
  add(){
    if(this.unitSelected && this.bendSelected){
      this.Form.title = 'Tambah Pajak Belanja Transfer';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idunit : this.unitSelected.idunit,
        idbend: this.bendSelected.idbend
      });
      this.Form.unitSelected = this.unitSelected;
      this.Form.showThis = true;
    }
  }
  print(e: IBkpajak){}
  update(e: IBkpajak){
    this.Form.forms.patchValue({
      idbkpajak : e.idbkpajak,
      idunit : e.idunit,
      idbend : e.idbend,
      nobkpajak : e.nobkpajak,
      kdstatus : e.kdstatus,
      tglbkpajak : e.tglbkpajak != null ? new Date(e.tglbkpajak) : null,
      tglvalid : e.tglvalid != null ? new Date(e.tglvalid) : null,
      uraian : e.uraian
    });
    this.Form.unitSelected = this.unitSelected;
    this.Form.title = 'Ubah Pajak Belanja Transfer';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IBkpajak){
    this.notif.confir({
			message: `${e.nobkpajak} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idbkpajak).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idbkpajak !== e.idbkpajak);
              this.notif.success('Data berhasil dihapus');
              this.dataSelected = null;
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
  dataKlick(e: IBkpajak){
    if(this.unitSelected && this.bendSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Unit & Bendahara');
    }
	}
  ngOnDestroy(): void{
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
    this.indexSubs.unsubscribe();
  }
}