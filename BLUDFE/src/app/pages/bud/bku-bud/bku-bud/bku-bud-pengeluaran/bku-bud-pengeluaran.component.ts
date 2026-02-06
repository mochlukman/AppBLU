import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IBkbkas } from 'src/app/core/interface/ibkbkas';
import { IBkuk } from 'src/app/core/interface/ibku-bud';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BkuBudService } from 'src/app/core/services/bku-bud.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookRekeningBudComponent } from 'src/app/shared/lookups/look-rekening-bud/look-rekening-bud.component';
import { BkuBudPengeluaranFormComponent } from '../bku-bud-pengeluaran-form/bku-bud-pengeluaran-form.component';

@Component({
  selector: 'app-bku-bud-pengeluaran',
  templateUrl: './bku-bud-pengeluaran.component.html',
  styleUrls: ['./bku-bud-pengeluaran.component.scss']
})
export class BkuBudPengeluaranComponent implements OnInit, OnDestroy {
  loading: boolean;
  uiRek: IDisplayGlobal;
  rekSelected: IBkbkas;
  listdata: IBkuk[] = [];
  dataSelected: IBkuk;
  userinfo: ITokenClaim;
  formFilter: FormGroup;
  initalForm: any;
  indexSubs : Subscription;
  indoKalender: any;
  @ViewChild(LookRekeningBudComponent, {static: true}) Rekening: LookRekeningBudComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(BkuBudPengeluaranFormComponent, {static: true}) Form: BkuBudPengeluaranFormComponent;
  constructor(
    private auth: AuthenticationService,
    private notif: NotifService,
    private service: BkuBudService,
    private fb: FormBuilder
  ) {
    this.uiRek = {kode: '', nama: ''};
    this.userinfo = this.auth.getTokenInfo();
    this.indoKalender = indoKalender;
    this.formFilter = this.fb.group({
      nobbantu: ['', Validators.required],
      jenis: 'bkuk',
      tgl1: [new Date(new Date().getFullYear() +'-01-01'), Validators.required],
      tgl2: [new Date(new Date().getFullYear() +'-12-31'), Validators.required],
    });
    this.indexSubs = this.service._tabIndex.subscribe(resp => {
      if(resp === 1){
      }
    });
  }
  lookRekening(){
    this.Rekening.title = 'Pilih Rekening BUD';
    this.Rekening.gets();
    this.Rekening.showThis = true;
  }
  callbackRekening(e: IBkbkas){
    this.rekSelected = e;
    this.uiRek = {kode: e.nobbantu.trim(), nama: e.nmbkas};
    this.formFilter.patchValue({
      nobbantu: e.nobbantu
    })
  }
  callback(e: any){
    if(e.added){
      if(this.dt){
        this.dt.reset();
        this.gets();
      }
    }
  }
  gets(){
    if(this.formFilter.valid){
      this.formFilter.patchValue({
        tgl1: this.formFilter.value.tgl1 != null ? new Date(this.formFilter.value.tgl1).toLocaleDateString('en-US') : null,
        tgl2: this.formFilter.value.tgl2 != null ? new Date(this.formFilter.value.tgl2).toLocaleDateString('en-US') : null
      });
      this.listdata = [];
      this.loading = true;
      this.service.gets(this.formFilter.value.jenis, this.formFilter.value.nobbantu, this.formFilter.value.tgl1, this.formFilter.value.tgl2)
      .subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        } else {
          this.notif.info('Data Tidak tersedia');
        }
        this.loading = false;
      }, (error) => {
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
        this.loading = false;
      });
    } else {
      this.notif.warning('Lengkapi Form Filter');
    }
  }
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      nobbantu: this.formFilter.value.nobbantu.trim()
    })
    this.Form.showThis = true;
  }
  delete(e: IBkuk){
    this.notif.confir({
			message: `${e.nobukas} Akan Dihapus ?`,
			accept: () => {
				this.service.delete('bkud', e.nobukas.trim()).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.nobukas.trim() !== e.nobukas.trim());
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
  ngOnInit() {
  }
  ngOnDestroy(): void{
    this.formFilter.reset(this.initalForm);
    this.uiRek = {kode:'',nama:''};
    this.rekSelected = null;
    this.listdata = [];
    this.dataSelected = null;
  }
}
