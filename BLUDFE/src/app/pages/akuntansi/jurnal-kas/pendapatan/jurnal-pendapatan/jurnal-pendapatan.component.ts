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
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';

@Component({
  selector: 'app-jurnal-pendapatan',
  templateUrl: './jurnal-pendapatan.component.html',
  styleUrls: ['./jurnal-pendapatan.component.scss']
})
export class JurnalPendapatanComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  indoKalender: any;
  formFilter: FormGroup;
  initialForm: any;
  listdata: IBkuPenerimaan[] = [];
  dataSelected: IBkuPenerimaan;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  constructor(
    private auth: AuthenticationService,
    private notif: NotifService,
    private fb: FormBuilder,
    private service: JurnalKasService,
    private unitService: DaftunitService
  ) {
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      jenis: [''],
      tgl1: [new Date(new Date().getFullYear() +'-01-01'), Validators.required],
      tgl2: [new Date(new Date().getFullYear() +'-12-31'), Validators.required],
      jurnalType: 'pendapatan'
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
      idunit: this.unitSelected.idunit
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
  ngOnDestroy(): void {
    this.unitSelected = null;
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter.reset(this.initialForm);
    this.loading = false;
  }
}
