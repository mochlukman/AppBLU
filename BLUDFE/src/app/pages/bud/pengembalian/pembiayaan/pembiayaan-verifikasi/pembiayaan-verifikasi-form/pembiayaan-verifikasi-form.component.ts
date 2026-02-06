import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BendService } from 'src/app/core/services/bend.service';
import { JabttdService } from 'src/app/core/services/jabttd.service';
import { Sp2dService } from 'src/app/core/services/sp2d.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import { LookSpmComponent } from 'src/app/shared/lookups/look-spm/look-spm.component';

@Component({
  selector: 'app-pembiayaan-verifikasi-form',
  templateUrl: './pembiayaan-verifikasi-form.component.html',
  styleUrls: ['./pembiayaan-verifikasi-form.component.scss']
})
export class PembiayaanVerifikasiFormComponent implements OnInit {
  loading_post: boolean;
  uiSpm: IDisplayGlobal;
  spmSelected: ISpm;
  uiSpd: IDisplayGlobal;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  indoKalender: any;
  listJabttd: SelectItem[] = [];
  jabttdSelected: any;
  nmstatus: string;
  userInfo: ITokenClaim;
  @ViewChild(LookSpmComponent,{static: true}) Spm : LookSpmComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  validasi: boolean;
  initialForm: any;
  unitSelected: IDaftunit;
  constructor(
    private service: Sp2dService,
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService,
    private stattrsService: StattrsService,
    private bendaharaService: BendService,
    private jabttdService: JabttdService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.uiSpm = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idsp2d : 0,
      idspm : [0, [Validators.required, Validators.min(1)]],
      idspd : [0, [Validators.required, Validators.min(1)]],
      idunit : [0, [Validators.required, Validators.min(1)]],
      nosp2d : ['', Validators.required],
      kdstatus : ['', Validators.required],
      idbend : null,
      idxkode : [0, [Validators.required, Validators.min(1)]],
      noreg : '',
      ketotor : '',
      keperluan : '',
      penolakan : null,
      tglsp2d : null,
      nospd: '',
      tglspd: null,
      idttd: 0,
      nospm: '',
      tglvalid: null,
      valid: null,
      validasi: ''
    });
    this.initialForm = this.forms.value;
    this.indoKalender = indoKalender;
  }

  ngOnInit(){
  }
  lookBendahara(){
    this.Bendahara.title = 'Pilih Bendahara';
    this.Bendahara.gets(this.forms.value.idunit);
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
  getJabttd(){
    this.listJabttd = [
      {label: 'Pilih', value: null}
    ];
    this.jabttdService.gets('04.301')
      .subscribe(resp => {
        if(resp.length > 0 ){
          resp.forEach(e => {
            this.listJabttd.push({label: `${e.idpegNavigation.nip} -  ${e.idpegNavigation.nama}`, value: e.idttd})
          });
        }
        if(this.mode === 'edit'){
          if(this.forms.value.idttd != null && this.forms.value.idttd != 0){
            this.jabttdSelected = this.listJabttd.find(w => w.value == this.forms.value.idttd).value;
          }
        }
      })
  }
  changejabttd(e: any){
    this.forms.patchValue({
      idttd:  e.value
    });
  }
  lookSpm(){
    this.Spm.title = 'Pilih SPM';
    this.Spm.params = {
      'Parameters.Idunit' : this.forms.value.idunit,
      'Parameters.Idxkode' : this.forms.value.idxkode,
      'Parameters.Kdstatus' : this.forms.value.kdstatus,
      'Parameters.Idkeg' : 0,
      'Parameters.Idbend' : 0,
    }
    this.Spm.showThis = true;
  }
  callbackSpm(e: ISpm){
    this.spmSelected = e;
    this.uiSpm = {kode: e.nospm, nama: e.tglspm !== null ? new Date(e.tglspm).toLocaleDateString('en-US') : ''};
    this.forms.patchValue({
      idspm: this.spmSelected.idspm,
      idspd: this.spmSelected.idsppNavigation.idspdNavigation.idspd,
      nospd: this.spmSelected.idsppNavigation.idspdNavigation.nospd,
      tglspd: this.spmSelected.idsppNavigation.idspdNavigation.tglspd != null ? new Date(this.spmSelected.idsppNavigation.idspdNavigation.tglspd).toLocaleDateString('en-US') : '',
      ketotor: this.spmSelected.ketotor,
      keperluan: this.spmSelected.keperluan,
      nospm: this.spmSelected.nospm

    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null,
      });
      this.service.pengesahan(this.forms.value).subscribe((resp) => {
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
  onShow(){
    this.getJabttd();
    if(this.mode == 'add'){
      this.service.getNoreg(this.forms.value.idunit)
      .subscribe(resp => {
        if(resp.noreg){
          let noreg =  resp.noreg;
          this.stattrsService.get(this.forms.value.kdstatus)
          .subscribe(resp => {
            this.forms.patchValue({
              nosp2d: `${noreg}/SP2D-${resp.lblstatus}/${this.unitSelected.kdunit}/${this.userInfo.NmTahun}`,
              noreg: noreg
            });
            this.nmstatus = resp.lblstatus.trim();
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
    } else if (this.mode == 'edit'){
      this.stattrsService.get(this.forms.value.kdstatus.trim())
        .subscribe(resp => this.nmstatus = resp.lblstatus.trim());
      this.bendaharaService.get(this.forms.value.idbend)
        .subscribe(resp => {
          if(resp.idbend){
            this.bendSelected = resp;
            this.forms.patchValue({
              idbend: resp.idbend
            });
            this.uiBend = {
              kode: this.bendSelected.idpegNavigation.nip,
              nama: this.bendSelected.idpegNavigation.nama + ',' + this.bendSelected.jnsbendNavigation.jnsbend.trim() + ' - ' + this.bendSelected.jnsbendNavigation.uraibend.trim()
            };
          }
        });
    }
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.uiSpm = {kode: '', nama: ''};
    this.uiSpd = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.spmSelected = null;
    this.bendSelected = null;
    this.loading_post = false;
    this.nmstatus = '';
    this.jabttdSelected = null;
  }
}
