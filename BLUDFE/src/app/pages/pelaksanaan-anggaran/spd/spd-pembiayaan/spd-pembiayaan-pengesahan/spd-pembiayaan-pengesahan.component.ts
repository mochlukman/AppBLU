import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpd, ISpddetb } from 'src/app/core/interface/ispd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { SpdService } from 'src/app/core/services/spd.service';
import { SpddetbService } from 'src/app/core/services/spddetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { FormSpdbPengesahanComponent } from './form-spdb-pengesahan/form-spdb-pengesahan.component';

@Component({
  selector: 'app-spd-pembiayaan-pengesahan',
  templateUrl: './spd-pembiayaan-pengesahan.component.html',
  styleUrls: ['./spd-pembiayaan-pengesahan.component.scss']
})
export class SpdPembiayaanPengesahanComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  loading_rek: boolean;
  listdata: ISpd[] = [];
  listrek: ISpddetb[] = [];
  dataSelected: ISpd = null;
  rekSelected: ISpddetb = null;
  subscribe_rek : Subscription;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild('dtrek',{static:true}) dtrek: any;
  @ViewChild(FormSpdbPengesahanComponent, {static: true}) Form: FormSpdbPengesahanComponent;
  constructor(
    private auth: AuthenticationService,
    private service: SpdService,
    private service_rek: SpddetbService,
    private notif: NotifService,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.subscribe_rek = this.service_rek._rekSelected.subscribe(resp => this.rekSelected = resp);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 0){
      if(this.userInfo.Idunit != 0){
        this.unitService.get(this.userInfo.Idunit).subscribe(resp => {
          this.callBackDaftunit(resp);
        },error => {
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
    } else {
      this.ngOnDestroy();
    }
  }

  ngOnInit() {
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.dataSelected = null;
    this.listdata = [];
    this.listrek = [];
    this.service_rek.setRekSelected(null);
    this.getDatas();
  }
  getDatas(){
    if(this.unitSelected){
      this.listrek = [];
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.unitSelected.idunit, 5)
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
      this.notif.warning('Pilih SKPD');
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idspd === e.data.idspd);
      this.listdata = this.listdata.filter(f => f.idspd != e.data.idspd);
      this.listdata.splice(index, 0, e.data);
    }
    this.dt.reset();
  }
  update(e: ISpd){
    this.Form.forms.patchValue({
      idspd: e.idspd,
      idunit: e.idunit,
      idxkode: e.idxkode,
      nospd: e.nospd,
      tglspd: e.tglspd !== null ? new Date(e.tglspd) : new Date(),
      keterangan: e.keterangan,
      idbulan1: e.idbulan1,
      idbulan2: e.idbulan2,
      idttd: e.idttd,
      tglvalid: e.tglvalid !== null ? new Date(e.tglvalid) : new Date(),
      valid: e.valid
    });
    this.Form.title = 'Pengesahan Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISpd){
    let postBody = {
      idspd: e.idspd,
      idunit: e.idunit,
      idxkode: e.idxkode,
      nospd: e.nospd,
      tglspd: e.tglspd !== null ? new Date(e.tglspd) : new Date(),
      keterangan: e.keterangan,
      idbulan1: e.idbulan1,
      idbulan2: e.idbulan2,
      idttd: e.idttd,
      tglvalid: null,
      valid: null
    };
    this.notif.confir({
      message: `Batalkan Pengesahan ?`,
      accept: () => {
        this.service.pengesahan(postBody).subscribe(
          (resp) => {
            if (resp.ok) {
              this.callback({
                edited: true,
                data: resp.body
              });
              this.notif.success('Pengesahan Berhasil Dibatalkan');
            }
          }, (error) => {
            if (Array.isArray(error.error.error)) {
              for (var i = 0; i < error.error.error.length; i++) {
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
  dataKlick(e: ISpd){
		this.dataSelected = e;
    this.service_rek.setRekSelected(null);
    this.getRek();
	}
  getRek(){
    if(this.dataSelected){
      if(this.dtrek) this.dtrek.reset();
      this.loading_rek = true;
      this.listrek = [];
      this.service_rek.gets(this.dataSelected.idspd)
        .subscribe(resp => {
          if(resp.length){
            this.listrek = [...resp]
          } else {
            this.notif.info('Data Rekening Tidak Tersedia');
          }
          this.loading_rek = false;
        }, error => {
          this.loading_rek = false;
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    }
  }
  totalNilai(){
    let total = 0;
		if(this.listrek.length > 0){
			this.listrek.forEach(f => total += f.nilai);
		}
		return total;
  }
  rekKlik(e: ISpddetb){
    this.service_rek.setRekSelected(e);
  }
  ngOnDestroy(): void{
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
    this.listrek = [];
    this.service_rek.setRekSelected(null);
    this.subscribe_rek.unsubscribe();
  }
}