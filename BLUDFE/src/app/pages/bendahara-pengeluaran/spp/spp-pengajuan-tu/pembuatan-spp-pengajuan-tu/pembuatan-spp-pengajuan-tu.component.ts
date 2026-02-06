import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpp } from 'src/app/core/interface/ispp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { SppService } from 'src/app/core/services/spp.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { LookTrackingDataComponent } from 'src/app/shared/lookups/look-tracking-data/look-tracking-data.component';
import { FormSppPengajuanTuComponent } from '../form-spp-pengajuan-tu/form-spp-pengajuan-tu.component';

@Component({
  selector: 'app-pembuatan-spp-pengajuan-tu',
  templateUrl: './pembuatan-spp-pengajuan-tu.component.html',
  styleUrls: ['./pembuatan-spp-pengajuan-tu.component.scss']
})
export class PembuatanSppPengajuanTuComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  loading_rek: boolean;
  listdata: ISpp[] = [];
  dataSelected: ISpp = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(FormSppPengajuanTuComponent, {static: true}) Form : FormSppPengajuanTuComponent;
  @ViewChild(LookTrackingDataComponent, {static: true}) Tracking : LookTrackingDataComponent;
  @ViewChild('dt',{static:false}) dt: any;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: SppService,
    private notif: NotifService,
    private stattrsService: StattrsService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(0)]],
      kdstatus: '23',
      idxkode: 2
    });
    this.initialForm = this.formFilter.value;
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
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
    this.dataSelected = null;
    this.get();
  }
  get(){
    if(this.formFilter.valid && this.tabIndex == 0){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service._idunit = this.formFilter.value.idunit;
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service._idxkode = this.formFilter.value.idxkode;
      this.service.gets()
        .subscribe(resp => {
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
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idspp === e.data.idspp);
      this.listdata = this.listdata.filter(f => f.idspp != e.data.idspp);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  add(){
    if(this.formFilter.valid){
      this.service.getNoreg(this.formFilter.value.idunit)
        .subscribe(resp => {
          if(resp.noreg){
            let noreg =  resp.noreg;
            this.stattrsService.get(this.formFilter.value.kdstatus)
            .subscribe(resp => {
              this.Form.forms.patchValue({
                idunit : this.formFilter.value.idunit,
                kdstatus : this.formFilter.value.kdstatus,
                idxkode : this.formFilter.value.idxkode,
                nospp: `${noreg}/S-PPD-${resp.lblstatus}/${this.unitSelected.kdunit}/${this.userInfo.NmTahun}`,
                noreg: noreg
              });
              this.Form.nmstatus = resp.lblstatus.trim();
              this.Form.title = 'Tambah';
              this.Form.mode = 'add';
              this.Form.showThis = true;
            },(error) => {
              if(Array.isArray(error.error.error)){
                for(var i = 0; i < error.error.error.length; i++){
                  this.notif.error(error.error.error[i]);
                }
              } else {
                this.notif.error(error.error);
              }
            });
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

    }
  }
  update(e: ISpp){
    this.Form.forms.patchValue({
      idspp : e.idspp,
      idunit : e.idunit,
      nospp : e.nospp,
      kdstatus : e.kdstatus,
      idbulan : e.idbulan,
      idbend : e.idbend,
      idspd : e.idspd,
      idphk3 : e.idphk3,
      idxkode : e.idxkode,
      noreg : e.noreg,
      ketotor : e.ketotor,
      idkontrak : e.idkontrak,
      keperluan : e.keperluan,
      tglspp : e.tglspp !== null ? new Date(e.tglspp) : new Date(),
      status : e.status,
      nilaiup: e.nilaiup
    });
    if(e.idspdNavigation){
      this.Form.uiSpd = {kode: e.idspdNavigation.nospd, nama: e.idspdNavigation.tglspd !== null ? new Date(e.idspdNavigation.tglspd).toLocaleDateString('en-US') : ''};
      this.Form.spdSelected = e.idspdNavigation;
    }
    if(e.idbendNavigation){
      this.Form.uiBend = {
        kode: e.idbendNavigation.idpegNavigation.nip,
        nama: e.idbendNavigation.idpegNavigation.nama + ',' + e.idbendNavigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbendNavigation.jnsbendNavigation.uraibend.trim()
      }
      this.Form.bendSelected = e.idbendNavigation;
    }
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISpp){
    this.notif.confir({
      header: 'Konfirmasi',
      message: `${e.nospp} akan di hapus ?`,
      accept: () => {
        this.service.delete(e.idspp).subscribe(
          () => {
            this.dataSelected = null;
            this.notif.success('Data berhasil dihapus');
            this.get();
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
  dataKlick(e: ISpp){
		this.dataSelected = e;
	}
  lookTracking(e: ISpp){
    this.Tracking.title = `Status Data S-PPD : ${e.nospp}`;
    this.Tracking._typedata = 'spp';
    this.Tracking._iddata = e.idspp;
    this.Tracking.showThis = true;
  }
  ngOnDestroy(): void{
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
    this.formFilter.reset(this.initialForm);
  }
}
