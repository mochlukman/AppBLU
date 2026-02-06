import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Message } from 'primeng/api';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { BpkdetrService } from 'src/app/core/services/bpkdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import {LookDafrekDpaSppSingleComponent} from 'src/app/shared/lookups/look-dafrek-dpa-spp-single/look-dafrek-dpa-spp-single.component';
import {LookJdanaComponent} from 'src/app/shared/lookups/look-jdana/look-jdana.component';
import {LookDparByBpkdetrComponent} from 'src/app/shared/lookups/look-dpar-by-bpkdetr/look-dpar-by-bpkdetr.component';
import {LookDparByBpkdetrSingleComponent} from 'src/app/shared/lookups/look-dpar-by-bpkdetr-single/look-dpar-by-bpkdetr-single.component';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IDaftrekening} from 'src/app/core/interface/idaftrekening';
import {IJdana} from 'src/app/core/interface/ijdana';
import {IDpar} from 'src/app/core/interface/idpar';

@Component({
  selector: 'app-pembuatan-bpk-rincian-belanja-form',
  templateUrl: './pembuatan-bpk-rincian-belanja-form.component.html',
  styleUrls: ['./pembuatan-bpk-rincian-belanja-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class PembuatanBpkRincianBelanjaFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  @ViewChild(LookDparByBpkdetrSingleComponent, {static: true}) Rekening : LookDparByBpkdetrSingleComponent;
  @ViewChild(LookJdanaComponent, {static: true}) Jdana : LookJdanaComponent;
  uiRekening: IDisplayGlobal;
  uiJdana: IDisplayGlobal;
  rekeningSelected: IDaftrekening;
  jdanaSelected: IJdana;
  initialForm: any;
  idunit:number = 0;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: BpkdetrService
  ) {
    this.forms = this.fb.group({
      idbpkdetr : 0,
      nilai : 0,
      idbpk: [0, Validators.required],
      idrek: [0, Validators.required],
      idkeg: [0, Validators.required],
      idjdana: [0, Validators.required]
    });
    this.initialForm = this.forms.value;
    this.uiRekening = {kode: '', nama: ''};
    this.uiJdana = {kode: '', nama: ''};
  }
  ngOnInit(){
  }
  lookRekening(){
    this.Rekening.title = 'Pilih Rekening';
    this.Rekening.gets(this.idunit, this.forms.value.idkeg, this.forms.value.idbpk);
    this.Rekening.showThis = true;
  }
  callbackRekening(e: IDpar){
    this.rekeningSelected = e.rekening;
    if(this.rekeningSelected){
      this.uiRekening = {kode: this.rekeningSelected.kdper.trim(), nama: this.rekeningSelected.nmper.trim()};
      this.forms.patchValue({idrek: this.rekeningSelected.idrek});
    }
  }
  lookJdana(){
    this.Jdana.title = 'Pilih Sumber Dana';
    this.Jdana.gets();
    this.Jdana.showThis = true;
  }
  callbackJdana(e: IJdana){
    this.jdanaSelected = e;
    this.uiJdana = {kode: this.jdanaSelected.kddana.trim(), nama: this.jdanaSelected.nmdana.trim()};
    this.forms.patchValue({
      idjdana: this.jdanaSelected.idjdana
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      if(this.mode === 'add'){
        this.service.postSingle(this.forms.value).subscribe((resp) => {
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
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.idunit = 0;
  }
}
