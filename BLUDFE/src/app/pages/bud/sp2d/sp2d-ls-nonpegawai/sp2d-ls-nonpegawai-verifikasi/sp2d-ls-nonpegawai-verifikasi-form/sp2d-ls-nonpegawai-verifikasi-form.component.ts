import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { JabttdService } from 'src/app/core/services/jabttd.service';
import { Sp2dService } from 'src/app/core/services/sp2d.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import {PpkService} from 'src/app/core/services/ppk.service';
import {IBkbkas} from 'src/app/core/interface/ibkbkas';

@Component({
  selector: 'app-sp2d-ls-nonpegawai-verifikasi-form',
  templateUrl: './sp2d-ls-nonpegawai-verifikasi-form.component.html',
  styleUrls: ['./sp2d-ls-nonpegawai-verifikasi-form.component.scss']
})
export class Sp2dLsNonpegawaiVerifikasiFormComponent implements OnInit {
  loading_post: boolean;
  uiSpm: IDisplayGlobal;
  spmSelected: ISpm;
  uiSpd: IDisplayGlobal;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  uiNobantu: IDisplayGlobal;
  nobantuSelected: IBkbkas;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  indoKalender: any;
  listBulan: SelectItem[] = [];
  bulanSelected: any;
  listPpk: SelectItem[] = [];
  ppkSelected: any;
  nmstatus: string;
  userInfo: ITokenClaim;
  initialValue: any;
  constructor(
    private service: Sp2dService,
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService,
    private stattrsService: StattrsService,
    private ppkService: PpkService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.uiSpm = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.uiNobantu = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idsp2d : 0,
      idspm : [0, [Validators.required, Validators.min(1)]],
      idspd : [0],
      idunit : [0, [Validators.required, Validators.min(1)]],
      nosp2d : ['', Validators.required],
      kdstatus : ['', Validators.required],
      idbend : null,
      idxkode : [0, Validators.required],
      noreg : '',
      ketotor : '',
      keperluan : '',
      tglsp2d : {value: null, disabled: true},
      nospd: '',
      tglspd: null,
      idttd: 0,
      idphk3 : null,
      idkontrak : null,
      nokontrak: '',
      nmphk3: '',
      nminst: '',
      tglvalid: null,
      valid: null,
      verifikasi: '',
      idkeg: 0,
      validasi: '',
      penolakan: '',
      idppk: 0,
      nobbantu: null
    });
    this.initialValue = this.forms.value;
    this.indoKalender = indoKalender;
  }

  ngOnInit(){
  }
  getPpk(){
    this.listPpk = [
      {label: 'Pilih', value: null}
    ];
    this.ppkService.gets({Idunit: this.forms.value.idunit})
      .subscribe(resp => {
        if(resp.length > 0 ){
          resp.forEach(e => {
            this.listPpk.push({label: `${e.idpegNavigation.nip} -  ${e.idpegNavigation.nama}`, value: e.idppk})
          });
        }
        if(this.mode === 'edit'){
          if(this.forms.value.idppk != null && this.forms.value.idppk != 0){
            this.ppkSelected = this.listPpk.find(w => w.value == this.forms.value.idppk).value;
          }
        }
      })
  }
  changePpk(e: any){
    this.forms.patchValue({
      idppk:  e.value
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null,
        penolakan: this.forms.valid ? '1' : '2'
      });
      this.forms.controls['tglsp2d'].enable();
      if(this.mode === 'edit'){
        this.service.pengesahan(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Pengesahan Data Berhasil');
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
    this.getPpk();
    if(this.mode == 'edit'){
      this.stattrsService.get(this.forms.value.kdstatus.trim())
        .subscribe(resp => this.nmstatus = resp.lblstatus.trim());
    }
  }
  onHide(){
    this.forms.reset(this.initialValue);
    this.forms.controls['tglsp2d'].disable();
    this.showThis = false;
    this.msg = [];
    this.uiSpm = {kode: '', nama: ''};
    this.uiSpd = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.uiNobantu = {kode: '', nama: ''};
    this.spmSelected = null;
    this.bendSelected = null;
    this.loading_post = false;
    this.nmstatus = '';
    this.bulanSelected = null;
    this.listBulan = [];
    this.ppkSelected = null;
    this.nobantuSelected = null;
  }
}
