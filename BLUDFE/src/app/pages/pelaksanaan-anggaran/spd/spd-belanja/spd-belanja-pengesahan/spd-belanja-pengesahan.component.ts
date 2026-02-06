import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpd } from 'src/app/core/interface/ispd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { SpdService } from 'src/app/core/services/spd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { eRekening } from 'src/app/core/_enum/etahap';
import { LookDaftunitDpaComponent } from 'src/app/shared/lookups/look-daftunit-dpa/look-daftunit-dpa.component';
import { FormSpdrPengesahanComponent } from './form-spdr-pengesahan/form-spdr-pengesahan.component';

@Component({
  selector: 'app-spd-belanja-pengesahan',
  templateUrl: './spd-belanja-pengesahan.component.html',
  styleUrls: ['./spd-belanja-pengesahan.component.scss']
})
export class SpdBelanjaPengesahanComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: ISpd[] = [];
  dataSelected: ISpd = null;
  @ViewChild(LookDaftunitDpaComponent, {static: true}) Daftunit : LookDaftunitDpaComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(FormSpdrPengesahanComponent, {static: true}) Form: FormSpdrPengesahanComponent;
  constructor(
    private auth: AuthenticationService,
    private service: SpdService,
    private notif: NotifService,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 1){
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
    this.getDatas();
  }
  getDatas(){
    if(this.unitSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.unitSelected.idunit, eRekening.Belanja)
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
  dataKlick(e: ISpd){
		this.dataSelected = e;
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
  ngOnDestroy(): void{
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
  }
}
