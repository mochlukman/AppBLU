import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { SpmService } from 'src/app/core/services/spm.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { LookDpakegiatanComponent } from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import { SpmLsPegawaiVerifikasiFormComponent } from './spm-ls-pegawai-verifikasi-form/spm-ls-pegawai-verifikasi-form.component';

@Component({
  selector: 'app-spm-ls-pegawai-verifikasi',
  templateUrl: './spm-ls-pegawai-verifikasi.component.html',
  styleUrls: ['./spm-ls-pegawai-verifikasi.component.scss']
})
export class SpmLsPegawaiVerifikasiComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  userInfo: ITokenClaim;
  loading: boolean;
  loading_rek: boolean;
  listdata: ISpm[] = [];
  dataSelected: ISpm = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookDpakegiatanComponent, {static: true}) Kegiatan : LookDpakegiatanComponent;
  @ViewChild(SpmLsPegawaiVerifikasiFormComponent, {static: true}) Form : SpmLsPegawaiVerifikasiFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: SpmService,
    private notif: NotifService,
    private unitService: DaftunitService,
    private fb: FormBuilder
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiKeg = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdstatus: '24',
      idxkode: 4,
      kdtahap: '321',
      idkeg: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.formFilter.value;
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
    this.listdata = [];
    this.dataSelected = null;
    this.kegSelected = null;
    this.uiKeg = {kode: '', nama: ''};
    this.get();
  }
  lookKegiatan(){
    if(this.unitSelected){
      this.Kegiatan.title = 'Pilih Sub Kegiatan';
      this.Kegiatan.get(this.formFilter.value.idunit, this.formFilter.value.kdtahap, false, 3); //parameter ke 4 = jnskeg, Pegawai SKPD
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
    if(this.formFilter.valid && this.tabIndex == 1){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service._idxkode = this.formFilter.value.idxkode;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._idkeg = this.formFilter.value.idkeg;
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
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idspm === e.data.idspm);
      this.listdata = this.listdata.filter(f => f.idspm != e.data.idspm);
      this.listdata.splice(index, 0, e.data);
    }
  }
  update(e: ISpm){
    this.Form.forms.patchValue({
      idspm: e.idspm,
      idspp : e.idspp,
      idunit : e.idunit,
      nospm : e.nospm,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idspd : e.idspd,
      idxkode : e.idxkode,
      noreg : e.noreg,
      ketotor : e.ketotor,
      keperluan : e.keperluan,
      penolakan : e.penolakan,
      tglspm : e.tglspm != null ? new Date(e.tglspm) : '',
      tglvalid : e.tglvalid !== null ? new Date(e.tglvalid) : new Date(),
      valid: e.valid,
      idkeg: e.idkeg,
      validasi: e.validasi
    });
    if(e.idsppNavigation){
      this.Form.uiSpp = {kode: e.idsppNavigation.nospp, nama: e.idsppNavigation.tglspp !== null ? new Date(e.idsppNavigation.tglspp).toLocaleDateString('en-US') : ''};
      this.Form.sppSelected = e.idsppNavigation;
      if(e.idsppNavigation.idspdNavigation){
        this.Form.forms.patchValue({
          nospd: e.idsppNavigation.idspdNavigation.nospd,
          tglspd: e.idsppNavigation.idspdNavigation.tglspd != null ? new Date(e.idsppNavigation.idspdNavigation.tglspd).toLocaleDateString('en-US') : '',
        });
      }
    }
    if(e.idbendNavigation){
      this.Form.bendSelected = e.idbendNavigation;
      this.Form.uiBend = {
        kode: e.idbendNavigation.idpegNavigation.nip,
        nama: e.idbendNavigation.idpegNavigation.nama + ',' + e.idbendNavigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbendNavigation.jnsbendNavigation.uraibend.trim()
      };
    }
    this.Form.title = 'Pengesahan Data';
    this.Form.mode = 'edit';
    this.Form.isstatus = e.status;
    this.Form.showThis = true;
  }
  delete(e: ISpm){
    let postBody = {
      idspm: e.idspm,
      noreg: e.noreg,
      nospm: e.nospm,
      kdstatus: e.kdstatus,
      tglspm: e.tglspm,
      tglvalid: null,
      valid: null,
      validasi: ''
    };
    this.notif.confir({
			message: `Batalkan Pengesahan ?`,
			accept: () => {
				this.service.pengesahan(postBody).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idspm !== e.idspm);
              this.notif.success('Pengesahan berhasil dibatalkan');
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
  dataKlick(e: ISpm){
    if(this.kegSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Sub Kegiatan');
    }
	}
  ngOnDestroy(): void{
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
    this.uiKeg = {kode: '', nama: ''};
		this.unitSelected = null;
		this.dataSelected = null;
    this.kegSelected = null;
    this.formFilter.reset(this.initialForm);
  }
}
