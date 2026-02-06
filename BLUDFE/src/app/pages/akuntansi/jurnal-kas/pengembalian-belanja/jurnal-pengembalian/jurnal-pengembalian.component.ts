import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBkuPenerimaan } from 'src/app/core/interface/ibku';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { JurnalKasService } from 'src/app/core/services/jurnal-kas.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormJurnalKasComponent } from 'src/app/shared/Component/form-jurnal-kas/form-jurnal-kas.component';
import { JurnalDetailComponent } from 'src/app/shared/Component/jurnal-detail/jurnal-detail.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';

@Component({
  selector: 'app-jurnal-pengembalian',
  templateUrl: './jurnal-pengembalian.component.html',
  styleUrls: ['./jurnal-pengembalian.component.scss']
})
export class JurnalPengembalianComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  indoKalender: any;
  formFilter: FormGroup;
  initialForm: any;
  listdata: any[] = [];
  dataSelected: IBkuPenerimaan;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(FormJurnalKasComponent, {static: true}) Form: FormJurnalKasComponent;
  @ViewChild(JurnalDetailComponent, {static: true}) Details: JurnalDetailComponent;
  constructor(
    private auth: AuthenticationService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService,
    private service: JurnalKasService
  ) {
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      jenis: ['sts'],
      tgl1: [new Date(new Date().getFullYear() +'-01-01'), Validators.required],
      tgl2: [new Date(new Date().getFullYear() +'-12-31'), Validators.required],
      jurnalType: 'pengembalian'
    });
    this.initialForm = this.formFilter.value;
    this.indoKalender = indoKalender;
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
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
      idbend: 0
    });
  }
  gets(){
    if(this.formFilter.valid){
      this.formFilter.patchValue({
        tgl1: this.formFilter.value.tgl1 != null ? new Date(this.formFilter.value.tgl1).toLocaleDateString('en-US') : null,
        tgl2: this.formFilter.value.tgl2 != null ? new Date(this.formFilter.value.tgl2).toLocaleDateString('en-US') : null
      });
      this.loading = true;
      this.listdata = [];
      this.service.jurnalSkpdNew(
        this.formFilter.value.idunit,
        this.formFilter.value.jenis,
        this.formFilter.value.tgl1,
        this.formFilter.value.tgl2,
        this.formFilter.value.jurnalType
      ).subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
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
    if(e.edited){
      this.gets();
    }
  }
  update(e: IBkuPenerimaan){
    this.Form.forms.patchValue({
      idbku : e.idbku,
      nobku : e.nobkuskpd,
      idunit : e.idunit,
      tglbku : e.tglbkuskpd ? new Date(e.tglbkuskpd) : null,
      uraian : e.uraian,
      tglvalidbku: e.tglvalidbku ? new Date(e.tglvalidbku) : null,
      idbend : e.idbend,
      jenis : e.jenis,
      nobukti: e.nobukti
    });
    this.Form.title = 'Edit';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IBkuPenerimaan){
    let postBody = {
      idbku : e.idbku,
      nobku : e.nobkuskpd,
      idunit : e.idunit,
      tglbku : e.tglbkuskpd ? new Date(e.tglbkuskpd) : null,
      uraian : e.uraian,
      tglvalidbku: null,
      idbend : e.idbend,
      jenis : e.jenis,
      nobukti: e.nobukti
    }
    this.notif.confir({
			message: `Hapus Validasi ?`,
			accept: () => {
				this.service.put(postBody).subscribe(
					(resp) => {
						if (resp.ok) {
              this.notif.success('Validasi berhasil dihapus');
              this.dataSelected = null;
              this.gets();
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
  detail(e: any){
    let paramBody = {
      idunit : e.idunit,
      jenis: 'Pengembalian',
      nobukti: e.nobukti
    };
    this.Details.params = paramBody;
    this.Details.title = 'Ayat - Ayat Jurnal';
    this.Details.showThis = true;
  }
  ngOnDestroy(): void {
    this.unitSelected = null;
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter.reset(this.initialForm);
    this.loading = false;
  }
}
