import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IKontrak } from 'src/app/core/interface/ikontrak';
import { indoKalender } from 'src/app/core/local';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { AdendumService } from 'src/app/core/services/adendum.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookKontrakComponent } from 'src/app/shared/lookups/look-kontrak/look-kontrak.component';

@Component({
  selector: 'app-form-adendum',
  templateUrl: './form-adendum.component.html',
  styleUrls: ['./form-adendum.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormAdendumComponent implements OnInit {
  loading_post: boolean;
  uiKontrak: IDisplayGlobal;
  kontrakSelected: IKontrak;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  @ViewChild(LookKontrakComponent, {static: true}) Kontrak : LookKontrakComponent;
  constructor(
    private service: AdendumService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idadd : 0,
      idunit : [0, Validators.required],
      idkeg : [0, Validators.required],
      noadd : '',
      tgladd : null,
      idkontrak : 0,
      nilaiawal : 0,
      nilaiadd : 0
    });
    this.uiKontrak = {kode: '', nama: ''};
    this.indoKalender = indoKalender;
  }
  ngOnInit(){
  }
  lookKontrak(){
    this.Kontrak.title = 'Pilih Kontrak';
    this.Kontrak.params = {
      'Parameters.Idunit' : this.forms.value.idunit,
      'Parameters.Idkeg' : 0,
      'Parameters.NoKontrakExist': 'true'
    }
    this.Kontrak.showThis = true;
  }
  callbackKontrak(e: any){
    this.kontrakSelected = e;
    this.uiKontrak = {kode: this.kontrakSelected.nokontrak, nama: this.kontrakSelected.tglkontrak !== null ? new Date(this.kontrakSelected.tglkontrak).toLocaleDateString('en-US') : ''};
    this.forms.patchValue({
      idkontrak: this.kontrakSelected.idkontrak,
      nilaiawal: this.kontrakSelected.nilai
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tgladd: this.forms.value.tgladd !== null ? new Date(this.forms.value.tgladd).toLocaleDateString('en-US') : null
      });
      if(this.mode === 'add'){
        this.service.post(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callBack.emit({
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
            this.callBack.emit({
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
    this.uiKontrak = {kode: '', nama: ''};
    this.forms.reset();
    this.forms.patchValue({
      idadd : 0,
      idunit : 0,
      idkeg : 0,
      noadd : '',
      tgladd : null,
      idkontrak : 0,
      nilaiawal : 0,
      nilaiadd : 0
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.kontrakSelected = null;
  }
}
