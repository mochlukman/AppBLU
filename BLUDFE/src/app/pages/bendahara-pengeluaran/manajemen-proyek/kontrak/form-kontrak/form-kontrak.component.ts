import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftphk3 } from 'src/app/core/interface/idaftphk3';
import { KontrakService } from 'src/app/core/services/kontrak.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import {indoKalender} from 'src/app/core/local';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { LookPhk3Component } from 'src/app/shared/lookups/look-phk3/look-phk3.component';
import { LookDpakegiatanComponent } from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
@Component({
  selector: 'app-form-kontrak',
  templateUrl: './form-kontrak.component.html',
  styleUrls: ['./form-kontrak.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormKontrakComponent implements OnInit {
  loading_post: boolean;
  uiPhk3: IDisplayGlobal;
  phk3Selected: IDaftphk3;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  @ViewChild(LookPhk3Component, {static: true}) Phk3 : LookPhk3Component;
  constructor(
    private service: KontrakService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idkontrak : [0],
      idunit : [0, [Validators.required, Validators.min(1)]],
      nokontrak : ['', Validators.required],
      idphk3 : [0, [Validators.required, Validators.min(1)]],
      idkeg : [0, [Validators.required, Validators.min(1)]],
      tglkontrak : [null],
      tglakhirkontrak : [null],
      uraian : [''],
      nilai : [0],
    });
    this.uiPhk3 = {kode: '', nama: ''};
    this.indoKalender = indoKalender;
  }
  ngOnInit(){
  }
  lookPhk3(){
    this.Phk3.title = 'Pilih Pihak Ketiga / Rekanan';
    this.Phk3.gets(this.forms.value.idunit);
    this.Phk3.showThis = true;
  }
  callbackPhk3(e: any){
    this.phk3Selected = e;
    this.uiPhk3 = {kode: this.phk3Selected.nmphk3, nama: this.phk3Selected.nminst};
    this.forms.patchValue({
      idphk3: this.phk3Selected.idphk3
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglkontrak: this.forms.value.tglkontrak !== null ? new Date(this.forms.value.tglkontrak).toLocaleDateString('en-US') : null,
        tglakhirkontrak: this.forms.value.tglakhirkontrak !== null ? new Date(this.forms.value.tglakhirkontrak).toLocaleDateString('en-US') : null
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
    this.uiPhk3 = {kode: '', nama: ''};
    this.forms.reset();
    this.forms.patchValue({
      idkontrak : 0,
      idunit : 0,
      idphk3 : 0,
      idkeg : 0,
      tglkontrak : null,
      tglakhirkontrak : null,
      nilai : 0
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.phk3Selected = null;
  }
}
