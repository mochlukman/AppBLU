import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IPajak } from 'src/app/core/interface/ipajak';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BkpajakdetstrService } from 'src/app/core/services/bkpajakdetstr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookPajakComponent } from 'src/app/shared/lookups/look-pajak/look-pajak.component';

@Component({
  selector: 'app-tab-pajak-transfer-detail-rincian-form',
  templateUrl: './tab-pajak-transfer-detail-rincian-form.component.html',
  styleUrls: ['./tab-pajak-transfer-detail-rincian-form.component.scss']
})
export class TabPajakTransferDetailRincianFormComponent implements OnInit {
  uiPajak: IDisplayGlobal;
  showThis: boolean;
  loading_post: boolean;
  title: string;
  mode: string;
  forms: FormGroup;
  msg: Message[];
  indoKalender: any;
  userInfo: ITokenClaim;
  initialForm: any;
  @Output() callback = new EventEmitter();
  @ViewChild(LookPajakComponent,{static: true}) Pajak : LookPajakComponent;
  constructor(
    private service: BkpajakdetstrService,
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.uiPajak = {kode: '', nama: ''};
    this.userInfo = this.authService.getTokenInfo();
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idbkpajakdetstr : 0,
      idpajak : [0, [Validators.required, Validators.min(1)]],
      idbkpajak : [0, [Validators.required, Validators.min(1)]],
      idbilling : '',
      tglidbilling : null,
      tglexpire : null,
      ntpn : '',
      ntb : ''
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit() {
  }
  lookPajak(){
    this.Pajak.title = 'Pilih Pajak';
    this.Pajak.gets();
    this.Pajak.showThis = true;
  }
  callBackPajak(e: IPajak){
    if(e.idpajak){
      this.forms.patchValue({
        idpajak: e.idpajak
      });
      this.uiPajak = {kode : e.kdpajak, nama: e.nmpajak};
    }
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglidbilling: this.forms.value.tglidbilling !== null ? new Date(this.forms.value.tglidbilling).toLocaleDateString('en-US') : null,
        tglexpire: this.forms.value.tglexpire !== null ? new Date(this.forms.value.tglexpire).toLocaleDateString('en-US') : null
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
    this.uiPajak = {kode: '', nama: ''};
    this.loading_post = false;
    this.showThis = false;
  }
}
