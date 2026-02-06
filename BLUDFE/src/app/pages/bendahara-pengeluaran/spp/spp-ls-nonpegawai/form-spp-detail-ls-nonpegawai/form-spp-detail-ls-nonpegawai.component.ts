import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftrekByspddetrComponent } from 'src/app/shared/lookups/look-daftrek-byspddetr/look-daftrek-byspddetr.component';
import {LookDafrekDpaSppComponent} from 'src/app/shared/lookups/look-dafrek-dpa-spp/look-dafrek-dpa-spp.component';
import {LookDafrekDpaSppSingleComponent} from 'src/app/shared/lookups/look-dafrek-dpa-spp-single/look-dafrek-dpa-spp-single.component';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IPajak} from 'src/app/core/interface/ipajak';
import {IJdana} from 'src/app/core/interface/ijdana';
import {LookJdanaComponent} from 'src/app/shared/lookups/look-jdana/look-jdana.component';

@Component({
  selector: 'app-form-spp-detail-ls-nonpegawai',
  templateUrl: './form-spp-detail-ls-nonpegawai.component.html',
  styleUrls: ['./form-spp-detail-ls-nonpegawai.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormSppDetailLsNonpegawaiComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialform: any;
  @Output() callback = new EventEmitter();
  @ViewChild(LookDafrekDpaSppSingleComponent, {static: true}) Rekening : LookDafrekDpaSppSingleComponent;
  @ViewChild(LookJdanaComponent, {static: true}) Jdana : LookJdanaComponent;
  listRekExist: number[] = [];
  @ViewChild('dt', {static:true}) dt: any;
  isvalid: boolean = false;
  uiRekening: IDisplayGlobal;
  uiJdana: IDisplayGlobal;
  rekeningSelected: IDaftrekening;
  jdanaSelected: IJdana;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: SppdetrService
  ) {
    this.forms = this.fb.group({
      idsppdetr : 0,
      idrek : [0, Validators.required],
      idkeg : [0, Validators.required],
      idspp : [0, Validators.required],
      idjdana: [0, Validators.required],
      nilai : 0,
      idspd: 0,
      idunit: 0
    });
    this.initialform = this.forms.value;
    this.uiRekening = {kode: '', nama: ''};
    this.uiJdana = {kode: '', nama: ''};
  }
  ngOnInit(){
  }
  lookRekening(){
    this.Rekening.title = 'Pilih Rekening';
    this.Rekening.gets(this.forms.value.idunit, this.forms.value.idkeg);
    this.Rekening.listRekExist = this.listRekExist;
    this.Rekening.showThis = true;
  }
  callbackRekening(e: IDaftrekening){
    this.rekeningSelected = e;
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
        this.service.putNilai(this.forms.value).subscribe((resp) => {
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
    this.forms.reset(this.initialform);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.listRekExist = [];
    this.isvalid = false;
    this.uiRekening = {kode: '', nama: ''};
    this.uiJdana = {kode: '', nama: ''};
    this.rekeningSelected = null;
    this.jdanaSelected = null;
  }
}
