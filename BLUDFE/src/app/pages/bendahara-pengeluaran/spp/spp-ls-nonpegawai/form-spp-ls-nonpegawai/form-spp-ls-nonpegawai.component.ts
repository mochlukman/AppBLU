import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftphk3 } from 'src/app/core/interface/idaftphk3';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpd } from 'src/app/core/interface/ispd';
import { ITagihan } from 'src/app/core/interface/itagihan';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BulanService } from 'src/app/core/services/bulan.service';
import { SpddetrService } from 'src/app/core/services/spddetr.service';
import { SppService } from 'src/app/core/services/spp.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import {LookPhk3Component } from 'src/app/shared/lookups/look-phk3/look-phk3.component';
import {LookupKontrakSppComponent} from 'src/app/shared/lookups/lookup-kontrak-spp/lookup-kontrak-spp.component';
import {IKontrak} from 'src/app/core/interface/ikontrak';

@Component({
  selector: 'app-form-spp-ls-nonpegawai',
  templateUrl: './form-spp-ls-nonpegawai.component.html',
  styleUrls: ['./form-spp-ls-nonpegawai.component.scss']
})
export class FormSppLsNonpegawaiComponent implements OnInit {
  loading_post: boolean;
  uiSpd: IDisplayGlobal;
  spdSelected: ISpd;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  uiTagihan: IDisplayGlobal;
  tagihanSelected: ITagihan;
  uiPhk3: IDisplayGlobal;
  phk3Selected: IDaftphk3;
  uiKontrak: IDisplayGlobal;
  kontrakSelected: IKontrak;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  indoKalender: any;
  listBulan: SelectItem[] = [];
  bulanSelected: any;
  nmstatus: string;
  userInfo: ITokenClaim;
  totalSpp: string;
  totalSpd: string;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild(LookPhk3Component, {static: true}) Phk3 : LookPhk3Component;
  @ViewChild(LookupKontrakSppComponent, {static: true}) Kontrak : LookupKontrakSppComponent;
  initialForm: any;
  isvalid: boolean = false;
  constructor(
    private service: SppService,
    private fb: FormBuilder,
    private notif: NotifService,
    private bulanService: BulanService,
    private authService: AuthenticationService,
    private sppdetrService: SppdetrService,
    private spddetrService: SpddetrService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.uiSpd = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.uiTagihan = {kode: '', nama: ''};
    this.uiPhk3 = {kode: '', nama: ''};
    this.uiKontrak = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idspp : 0,
      idunit : [0, Validators.required],
      nospp : ['', Validators.required],
      kdstatus : ['', Validators.required],
      idbulan : [null, Validators.required],
      idbend : null,
      idspd : [0],
      idphk3 : null,
      idxkode : [0, Validators.required],
      noreg : '',
      ketotor : '',
      idkontrak : null,
      keperluan : '',
      tglspp : null,
      status : '',
      nilaiup: 0,
      idkeg: 0,
      totalSpp: 0,
      totalSpd: 0
    });
    this.indoKalender = indoKalender;
    this.initialForm = this.forms.value;
  }

  ngOnInit(){
  }
  lookBendahara(){
    this.Bendahara.title = 'Pilih Bendahara';
    this.Bendahara.gets(this.forms.value.idunit,'02');
    this.Bendahara.showThis = true;
  }
  callBackBendahara(e: Ibend){
    this.bendSelected = e;
    this.forms.patchValue({
      idbend: this.bendSelected.idbend
    });
    this.uiBend = {
      kode: this.bendSelected.idpegNavigation.nip,
      nama: this.bendSelected.idpegNavigation.nama + ',' + this.bendSelected.jnsbendNavigation.jnsbend.trim() + ' - ' + this.bendSelected.jnsbendNavigation.uraibend.trim()
    };
  }
  lookKontrak(){
    this.Kontrak.title = 'Pilih Kontrak';
    this.Kontrak.params = {
      'Parameters.Idunit' : this.forms.value.idunit,
      'Parameters.Idkeg' : this.forms.value.idkeg,
      'Parameters.Idphk3' : this.forms.value.idphk3,
      'Parameters.NoKontrakExist': 'true'
    }
    this.Kontrak.showThis = true;
  }
  callbackKontrak(e: IKontrak){
    this.kontrakSelected = e;
    this.uiKontrak = {kode: e.nokontrak, nama: e.uraian};
    this.forms.patchValue({
      idkontrak: e.idkontrak
    });
  }
  lookPhk3(){
    this.Phk3.title = 'Pilih Pihak Ketiga';
    this.Phk3.gets(this.forms.value.idunit);
    this.Phk3.showThis = true;
  }
  callBackPhk3(e: IDaftphk3){
    this.phk3Selected = e;
    this.forms.patchValue({
      idphk3: this.phk3Selected.idphk3
    });
    this.uiPhk3 = {kode: e.nmphk3, nama: e.nminst}
  }
  getBulan(){
    this.listBulan = [];
    this.bulanService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          resp.forEach(x => {
            this.listBulan.push({label: x.ketBulan , value:x.idbulan});
          });
          if(this.mode === 'edit'){
            this.bulanSelected = this.listBulan.find(w => w.value == this.forms.value.idbulan).value;
          }
        }
      },(error) => {
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
      });
  }
  changeBulan(e: any){
    this.forms.patchValue({
      idbulan: e.value,
    });
  }
  getTotalNilai(){
    if(this.spdSelected){
      this.sppdetrService.getTotalNilai(
        this.forms.value.idunit,
        this.forms.value.idxkode,
        this.forms.value.kdstatus,
        this.forms.value.idspd
      ).subscribe(resp => {
        this.forms.patchValue({
          totalSpp: resp.totalSpp
        });
        this.totalSpp = new Intl.NumberFormat('ID').format(this.forms.value.totalSpp);
        this.spddetrService.getsTotalNilai(
          this.forms.value.idunit,
          this.forms.value.idspd
        ).subscribe(resp =>  {
          this.forms.patchValue({
            totalSpd: resp.totalSpd
          });
          this.totalSpd = new Intl.NumberFormat('ID').format(this.forms.value.totalSpd - this.forms.value.totalSpp);
        });
      });
    }
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglspp: this.forms.value.tglspp !== null ? new Date(this.forms.value.tglspp).toLocaleDateString('en-US') : null
      });
      if(this.mode === 'add'){
        this.service.post(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              added: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Input Data Berhasil');
          }
          this.loading_post = false;
        }, (error) => {
          if(Array.isArray(error.error.error)){
            this.msg = [];
            for(var i = 0; i < error.error.error.length; i++){
              this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
            }
          } else {
            this.msg = [];
            this.msg.push({severity: 'error', summary: 'error', detail: error.error});
          }
          this.loading_post = false;
        });
      } else if(this.mode === 'edit'){
        this.service.put(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Input Data Berhasil');
          }
          this.loading_post = false;
        }, (error) => {
          if(Array.isArray(error.error.error)){
            this.msg = [];
            for(var i = 0; i < error.error.error.length; i++){
              this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
            }
          } else {
            this.msg = [];
            this.msg.push({severity: 'error', summary: 'error', detail: error.error});
          }
          this.loading_post = false;
        });
      }
    }
  }
  onShow(){
    this.getBulan();
    if(this.mode == 'edit'){
      this.getTotalNilai();
    }
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.uiSpd = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.uiTagihan = {kode: '', nama: ''};
    this.uiPhk3 = {kode: '', nama: ''};
    this.uiKontrak = {kode: '', nama: ''};
    this.spdSelected = null;
    this.bendSelected = null;
    this.tagihanSelected = null;
    this.phk3Selected = null;
    this.loading_post = false;
    this.nmstatus = '';
    this.bulanSelected = null;
    this.kontrakSelected = null;
    this.listBulan = [];
    this.totalSpp = '';
    this.totalSpd = '';
    this.isvalid = false;
  }
}
