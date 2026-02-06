import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpp } from 'src/app/core/interface/ispp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpmService } from 'src/app/core/services/spm.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import { LookSppComponent } from 'src/app/shared/lookups/look-spp/look-spp.component';

@Component({
  selector: 'app-spm-ls-uangmuka-form',
  templateUrl: './spm-ls-uangmuka-form.component.html',
  styleUrls: ['./spm-ls-uangmuka-form.component.scss']
})
export class SpmLsUangmukaFormComponent implements OnInit {
  loading_post: boolean;
  uiSpp: IDisplayGlobal;
  sppSelected: ISpp;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  indoKalender: any;
  nmstatus: string;
  userInfo: ITokenClaim;
  @ViewChild(LookSppComponent,{static: true}) Spp : LookSppComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  initialForm: any;
  isvalid: boolean = false;
  constructor(
    private service: SpmService,
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService,
    private stattrsService: StattrsService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.uiSpp = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idspm: 0,
      idspp : [0, [Validators.required, Validators.min(1)]],
      idspd : [0, [Validators.required, Validators.min(1)]],
      idunit : [0, [Validators.required, Validators.min(1)]],
      nospm : ['', Validators.required],
      kdstatus : ['', Validators.required],
      idbulan : null,
      idbend : null,
      idphk3 : null,
      idxkode : [0, Validators.required],
      noreg : '',
      ketotor : '',
      idkontrak : null,
      keperluan : '',
      tglvalid : null,
      tglspm : null,
      nospd: '',
      tglspd: null,
      nokontrak: '',
      nmphk3: '',
      nminst: '',
      idkeg: 0
    });
    this.initialForm = this.forms.value;
    this.indoKalender = indoKalender;
  }

  ngOnInit(){
  }
  lookBendahara(){
    this.Bendahara.title = 'Pilih Bendahara';
    this.Bendahara.gets(this.forms.value.idunit, '02');
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
  /*lookSpp(){
    this.Spp.title = 'Pilih S-PPD';
    this.Spp._idunit = this.forms.value.idunit;
    this.Spp._idxkode = this.forms.value.idxkode;
    this.Spp._kdstatus = this.forms.value.kdstatus;
    this.Spp.gets();
    this.Spp.showThis = true;
  }*/

    lookSpp(){
    this.Spp.title = 'Pilih S-PPD';
    this.Spp.params = {
      'Parameters.Idunit' : this.forms.value.idunit,
      'Parameters.Idxkode' : this.forms.value.idxkode,
      'Parameters.Kdstatus' : this.forms.value.kdstatus,
      'Parameters.Idkeg' : 0,
      'Parameters.Idbend' : 0,
      'Parameters.NoSppExist': 'true'
    }
    this.Spp.showThis = true;
  }
  
  callbackSpp(e: ISpp){
    this.sppSelected = e;
    this.uiSpp = {kode: e.nospp, nama: e.tglspp !== null ? new Date(e.tglspp).toLocaleDateString('en-US') : ''};
    this.forms.patchValue({
      idspp: this.sppSelected.idspp,
      idspd: this.sppSelected.idspdNavigation.idspd,
      nospd: this.sppSelected.idspdNavigation.nospd,
      tglspd: this.sppSelected.idspdNavigation.tglspd != null ? new Date(this.sppSelected.idspdNavigation.tglspd).toLocaleDateString('en-US') : '',
      ketotor: this.sppSelected.ketotor,
      keperluan: this.sppSelected.keperluan,
      nokontrak: this.sppSelected.idkontrakNavigation ? this.sppSelected.idkontrakNavigation.nokontrak : '',
      nmphk3: this.sppSelected.idphk3Navigation ? this.sppSelected.idphk3Navigation.nmphk3 : '',
      nminst: this.sppSelected.idphk3Navigation ? this.sppSelected.idphk3Navigation.nminst : '',
      idphk3: this.sppSelected.idphk3Navigation ? this.sppSelected.idphk3Navigation.idphk3 : '',
      idkontrak: this.sppSelected.idkontrakNavigation ? this.sppSelected.idkontrakNavigation.idkontrak : null,
      idkeg: this.sppSelected.idkeg
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglspm: this.forms.value.tglspm !== null ? new Date(this.forms.value.tglspm).toLocaleDateString('en-US') : null
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
    if(this.mode == 'edit'){
      this.stattrsService.get(this.forms.value.kdstatus.trim())
          .subscribe(resp => this.nmstatus = resp.lblstatus.trim());
    }
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.uiSpp = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.sppSelected = null;
    this.bendSelected = null;
    this.loading_post = false;
    this.nmstatus = '';
    this.isvalid = false;
  }
}
