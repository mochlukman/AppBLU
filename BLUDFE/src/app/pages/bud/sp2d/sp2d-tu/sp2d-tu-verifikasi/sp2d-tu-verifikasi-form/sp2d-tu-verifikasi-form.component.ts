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

@Component({
  selector: 'app-sp2d-tu-verifikasi-form',
  templateUrl: './sp2d-tu-verifikasi-form.component.html',
  styleUrls: ['./sp2d-tu-verifikasi-form.component.scss']
})
export class Sp2dTuVerifikasiFormComponent implements OnInit {
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
  listBulan: SelectItem[] = [];
  bulanSelected: any;
  listJabttd: SelectItem[] = [];
  jabttdSelected: any;
  nmstatus: string;
  userInfo: ITokenClaim;
  initialValue: any;
  constructor(
    private service: Sp2dService,
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService,
    private stattrsService: StattrsService,
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
      idxkode : [0, Validators.required],
      noreg : '',
      ketotor : '',
      keperluan : '',
      penolakan : null,
      tglsp2d : {value: null, disabled: true},
      nospd: '',
      tglspd: null,
      idttd: 0,
      tglvalid: null,
      valid: null,
      verifikasi: '',
      validasi: ''
    });
    this.initialValue = this.forms.value;
    this.indoKalender = indoKalender;
  }

  ngOnInit(){
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
    this.getJabttd();
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
    this.spmSelected = null;
    this.bendSelected = null;
    this.loading_post = false;
    this.nmstatus = '';
    this.bulanSelected = null;
    this.listBulan = [];
    this.jabttdSelected = null;
  }
}
