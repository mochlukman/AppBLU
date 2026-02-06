import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IPaguskpd } from 'src/app/core/interface/ipaguskpd';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { PaguskpdService } from 'src/app/core/services/paguskpd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';

@Component({
  selector: 'app-form-skup',
  templateUrl: './form-skup.component.html',
  styleUrls: ['./form-skup.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormSkupComponent implements OnInit {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  @Output() callBack = new EventEmitter();
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  constructor(
    private service: PaguskpdService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idpaguskpd : 0,
      idunit : [0, [Validators.required, Validators.min(1)]],
      kdtahap : ['', Validators.required],
      nilaiup : 0,
      nilai : 0
    });
    this.initialForm = this.forms.value;
    this.uiUnit = {kode: '', nama: ''};
  }
  ngOnInit(){
  }
  lookUnit(){
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callbackUnit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: e.kdunit , nama: e.nmunit};
    this.forms.patchValue({
      idunit: e.idunit
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
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
    this.uiUnit = {kode: '', nama: ''};
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.unitSelected = null;
  }
}