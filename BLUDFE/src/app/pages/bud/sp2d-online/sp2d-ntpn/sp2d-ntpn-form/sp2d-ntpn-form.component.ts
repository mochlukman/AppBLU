import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Sp2dNtpnService } from 'src/app/core/services/sp2d-ntpn.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookSp2dComponent } from 'src/app/shared/lookups/look-sp2d/look-sp2d.component';

@Component({
  selector: 'app-sp2d-ntpn-form',
  templateUrl: './sp2d-ntpn-form.component.html',
  styleUrls: ['./sp2d-ntpn-form.component.scss']
})
export class Sp2dNtpnFormComponent implements OnInit {
  showThis: boolean;
  loading_post: boolean;
  title: string;
  mode: string;
  forms: FormGroup
  msg: Message[];
  indoKalender: any;
  userInfo: ITokenClaim;
  initialForm: any;
  @Output() callback = new EventEmitter();
  uiSp2d: IDisplayGlobal;
  sp2dSelected: ISp2d;
  @ViewChild(LookSp2dComponent, {static: true}) Sp2d : LookSp2dComponent;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService,
    private service: Sp2dNtpnService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idntpn : 0,
      idunit: [0, [Validators.required, Validators.min(1)]],
      ntpn : ['', Validators.required],
      tglntpn : [null, Validators.required],
      idsp2d : [0, [Validators.required, Validators.min(1)]],
      idbilling : ''
    });
    this.initialForm = this.forms.value;
    this.uiSp2d = {kode: '', nama: ''};
  }
  ngOnInit() {
  }
  lookSp2d(){
    this.Sp2d.title = 'Pilih SP2D';
    this.Sp2d.params = {
      'Parameters.Idunit' : this.forms.value.idunit
    }
    this.Sp2d.showThis = true;
  }
  callBacSp2d(e: ISp2d){
    this.sp2dSelected = e;
    this.uiSp2d = {
      kode: this.sp2dSelected.nosp2d,
      nama: this.sp2dSelected.keperluan
    };
    this.forms.patchValue({
      idsp2d: this.sp2dSelected.idsp2d
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglntpn: this.forms.value.tglntpn !== null ? new Date(this.forms.value.tglntpn).toLocaleDateString('en-US') : null
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
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.msg = [];
    this.loading_post = false;
    this.showThis = false;
    this.uiSp2d = {kode: '', nama: ''};
    this.sp2dSelected = null;
  }
}
