import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ibend } from 'src/app/core/interface/ibend';
import { IBkuPenerimaan } from 'src/app/core/interface/ibku';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BkuPenerimaanMainPageService } from 'src/app/core/services/bku-penerimaan-main-page.service';
import { BkuPenerimaanService } from 'src/app/core/services/bku-penerimaan.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { BkuPengembalianPendapatanFormComponent } from './bku-pengembalian-pendapatan-form/bku-pengembalian-pendapatan-form.component';

@Component({
  selector: 'app-bku-pengembalian-pendapatan',
  templateUrl: './bku-pengembalian-pendapatan.component.html',
  styleUrls: ['./bku-pengembalian-pendapatan.component.scss']
})
export class BkuPengembalianPendapatanComponent implements OnInit {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  indexSubs : Subscription;
  userInfo: ITokenClaim;
  loading: boolean;
  indoKalender: any;
  formFilter: FormGroup;
  initialForm: any;
  listdata: IBkuPenerimaan[] = [];
  dataSelected: IBkuPenerimaan;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(BkuPengembalianPendapatanFormComponent, {static: true}) Form: BkuPengembalianPendapatanFormComponent;
  constructor(
    private mainService: BkuPenerimaanMainPageService,
    private auth: AuthenticationService,
    private notif: NotifService,
    private unitService: DaftunitService,
    private fb: FormBuilder,
    private service: BkuPenerimaanService
  ) {
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      idbend: [0, [Validators.required, Validators.min(1)]],
      jenis: ['sp2d'],
      tgl1: [new Date(new Date().getFullYear() +'-01-01'), Validators.required],
      tgl2: [new Date(new Date().getFullYear() +'-12-31'), Validators.required],
    });
    this.initialForm = this.formFilter.value;
    this.indoKalender = indoKalender;
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.indexSubs = this.mainService._tabIndex.subscribe(resp => {
      if(resp === 2){}
    });
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
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit,
      idbend: 0
    });
  }
  lookBendahara(){
    if(this.unitSelected){
      this.Bendahara.title = 'Pilih Bendahara';
      this.Bendahara.gets(this.unitSelected.idunit,'01');
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
    this.formFilter.patchValue({
      idbend: this.bendSelected.idbend
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
      this.service.gets(
        this.formFilter.value.idunit,
        this.formFilter.value.idbend,
        this.formFilter.value.jenis,
        this.formFilter.value.tgl1,
        this.formFilter.value.tgl2,
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
    if(e.added){
      this.listdata.push(e.data);
    }
  }
  add(){
    if(this.formFilter.valid){
      this.Form.loading_post = true;
      this.service.generateNoBku(this.formFilter.value.idunit, this.formFilter.value.idbend)
        .subscribe(resp => {
          if(resp.nobku){
            this.Form.forms.patchValue({
              idunit: this.formFilter.value.idunit,
              idbend: this.formFilter.value.idbend,
              nobku: resp.nobku,
              jenis: 'sp2d'
            });
            this.Form.title = 'Tambah BKU Pengembalian Pendapatan';
            this.Form.mode = 'add';
            this.Form.showThis = true;
          }
          this.Form.loading_post = false;
        }, error => {
          this.Form.loading_post = false;
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
  delete(e: IBkuPenerimaan){
    this.notif.confir({
			message: `${e.nobkuskpd} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.nobkuskpd, 'sp2d').subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.nobkuskpd.trim() !== e.nobkuskpd.trim());
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
  ngOnDestroy(): void {
    this.unitSelected = null;
    this.bendSelected = null;
    this.uiUnit = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.formFilter.reset(this.initialForm);
    this.loading = false;
  }
}
