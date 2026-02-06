import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { ISpp } from 'src/app/core/interface/ispp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { SppService } from 'src/app/core/services/spp.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { LookDpakegiatanComponent } from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import { TolakSppLsUangmukaCheckComponent } from './tolak-spp-ls-uangmuka-check/tolak-spp-ls-uangmuka-check.component';
import { TolakSppLsUangmukaFormComponent } from './tolak-spp-ls-uangmuka-form/tolak-spp-ls-uangmuka-form.component';

@Component({
  selector: 'app-tolak-spp-ls-uangmuka',
  templateUrl: './tolak-spp-ls-uangmuka.component.html',
  styleUrls: ['./tolak-spp-ls-uangmuka.component.scss']
})
export class TolakSppLsUangmukaComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  userInfo: ITokenClaim;
  loading: boolean;
  loading_rek: boolean;
  listdata: ISpp[] = [];
  dataSelected: ISpp = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookDpakegiatanComponent, {static: true}) Kegiatan : LookDpakegiatanComponent;
  @ViewChild(TolakSppLsUangmukaFormComponent, {static: true}) Form : TolakSppLsUangmukaFormComponent;
  @ViewChild(TolakSppLsUangmukaCheckComponent, {static: true}) Checks: TolakSppLsUangmukaCheckComponent;
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
    this.uiKeg = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdstatus: '25',
      idxkode: 2,
      kdtahap: '321',
      idkeg: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.formFilter.value;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 2){
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
      idunit: this.unitSelected.idunit,
      idkeg: 0
    });
    this.dataSelected = null;
    this.listdata = [];
    this.uiKeg = {kode: '', nama: ''};
    this.kegSelected = null;
    this.get();
  }
  lookKegiatan(){
    if(this.unitSelected){
      this.Kegiatan.title = 'Pilih Sub Kegiatan';
      this.Kegiatan.get(this.formFilter.value.idunit, this.formFilter.value.kdtahap, false, 2); //parameter ke 4 = jnskeg, Non Pegawai SKPD
      this.Kegiatan.showThis = true;
    } else {
      this.notif.warning('Pilih Unit Organisasi');
    }
  }
  callBackKegiatan(e: ILookupTree){
    this.kegSelected = e;
    let split_label = this.kegSelected.label.split('-');
    this.uiKeg = {kode: split_label[0], nama: split_label[1]};
    this.formFilter.patchValue({
      idkeg: this.kegSelected.data_id
    });
    this.get();
  }
  get(){
    if(this.formFilter.valid && this.tabIndex == 2){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service._idxkode = this.formFilter.value.idxkode;
      this.service._idkeg = this.formFilter.value.idkeg;
      this.service.gets()
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
      nilaiup: e.nilaiup,
      idkeg: this.kegSelected ? this.kegSelected.data_id : 0,
      status : e.status,
      tglaprove : e.tglaprove !== null ? new Date(e.tglaprove) : new Date(),
      verifikasi: e.verifikasi
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
    if(e.idphk3Navigation){
      this.Form.uiPhk3 = {kode: e.idphk3Navigation.nmphk3, nama: e.idphk3Navigation.nminst};
      this.Form.phk3Selected = e.idphk3Navigation;
    }
    this.stattrsService.get(e.kdstatus).subscribe(resp => {
      this.Form.nmstatus = resp.lblstatus.trim();
      this.Form.title = 'Approval Data';
      this.Form.mode = 'edit';
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
  delete(e: ISpp){
    let postBody = {
      idspp: e.idspp,
      nospp: e.nospp,
      kdstatus: e.kdstatus,
      tglspp: e.tglspp,
      tglaprove: null,
      verifikasi: '',
      status: null
    };
    this.notif.confir({
      message: `Batalkan Approval ?`,
      accept: () => {
        this.service.penolakan(postBody).subscribe(
          (resp) => {
            if (resp.ok) {
              this.callback({
                edited: true,
                data: resp.body
              });
              this.notif.success('Approval Berhasil Dibatalkan');
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
  dataKlick(e: ISpp){
		if(this.kegSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Sub Kegiatan');
    }
	}
  lookCheck(e: ISpp){
    this.Checks.title = 'Check List Dokumen';
    this.Checks._idspp = e.idspp;
    this.Checks._idxkode = e.idxkode;
    this.Checks.showThis = true;
  }
  ngOnDestroy(): void{
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
    this.uiKeg = { kode: '', nama: '' };
		this.unitSelected = null;
    this.kegSelected = null;
		this.dataSelected = null;
    if(this.formFilter) this.formFilter.reset(this.initialForm);
  }
}
