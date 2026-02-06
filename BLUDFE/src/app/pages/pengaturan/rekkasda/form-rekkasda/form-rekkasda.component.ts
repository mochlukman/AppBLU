import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { IDaftbank } from 'src/app/core/interface/idaftbank';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { BkbkasService } from 'src/app/core/services/bkbkas.service';
import { DaftbankService } from 'src/app/core/services/daftbank.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftrekBykodeComponent } from 'src/app/shared/lookups/look-daftrek-bykode/look-daftrek-bykode.component';

@Component({
  selector: 'app-form-rekkasda',
  templateUrl: './form-rekkasda.component.html',
  styleUrls: ['./form-rekkasda.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormRekkasdaComponent implements OnInit {
  loading_post: boolean;
  uiRek: IDisplayGlobal;
  rekSelected: IDaftrekening;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  bank: SelectItem[] = [];
  bankSelected: IDaftbank;
  listBank: IDaftbank[] = [];
  @ViewChild(LookDaftrekBykodeComponent, {static: true}) Rekening : LookDaftrekBykodeComponent;
  constructor(
    private service: BkbkasService,
    private fb: FormBuilder,
    private notif: NotifService,
    private daftbankService: DaftbankService
  ) {
    this.forms = this.fb.group({
      nobbantu : ['', Validators.required],
      idunit : [0, Validators.required],
      idrek : [0, Validators.required],
      idbank : [0, Validators.required],
      nmbkas : '',
      norek : '',
      saldo : 0
    });
    this.uiRek = {kode: '', nama: ''};
  }
  ngOnInit(){
  }
  lookRek(){
    this.Rekening.title = 'Pilih Rekening Neraca';
    this.Rekening.kode = '1.,2.,3.';
    this.Rekening.showThis = true;
  }
  callbackRek(e: IDaftrekening){
    this.rekSelected = e;
    this.uiRek = {kode: e.kdper, nama: e.nmper};
    this.forms.patchValue({
      idrek: e.idrek
    });
  }
  getBank(){
    this.bank = [];
    this.daftbankService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          this.listBank = [...resp];
          resp.forEach(x => {
            this.bank.push({label: x.kdbank + ' - ' + x.akbank, value:x.idbank});
          });
          if(this.mode === 'edit'){
            this.bankSelected = this.bank.find(w => w.value == this.forms.value.idbank).value;
          }
        }
      },(error) => {
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
      });
  }
  changeBank(e: any){
    this.forms.patchValue({
      idbank: e.value,
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
    this.getBank();
  }
  onHide(){
    this.uiRek = {kode: '', nama: ''};
    this.forms.reset();
    this.forms.patchValue({
      nobbantu : '',
      idunit : 0,
      idrek : 0,
      idbank : 0,
      nmbkas : '',
      norek : '',
      saldo : 0
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.listBank = [];
    this.bankSelected = null;
  }
}