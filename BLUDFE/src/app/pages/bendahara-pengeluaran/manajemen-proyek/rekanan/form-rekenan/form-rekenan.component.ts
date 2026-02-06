import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { IDaftbank } from 'src/app/core/interface/idaftbank';
import { IJbank } from 'src/app/core/interface/ijbank';
import { IJusaha } from 'src/app/core/interface/ijusaha';
import { DaftbankService } from 'src/app/core/services/daftbank.service';
import { Daftphk3Service } from 'src/app/core/services/daftphk3.service';
import { JbankService } from 'src/app/core/services/jbank.service';
import { JusahaService } from 'src/app/core/services/jusaha.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-form-rekenan',
  templateUrl: './form-rekenan.component.html',
  styleUrls: ['./form-rekenan.component.scss']
})
export class FormRekenanComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  usaha: IJusaha[] = [];
  usahaSelected: IJusaha;
  bank: IDaftbank[] = [];
  bankSelected: IDaftbank;
  constructor(
    private service: Daftphk3Service,
    private fb: FormBuilder,
    private notif: NotifService,
    private usahaService: JusahaService,
    private bankService: DaftbankService
  ) {
    this.forms = this.fb.group({
      idphk3: [0],
      idunit: [0, Validators.required],
      nmphk3: ['', Validators.required],
      nminst: ['', Validators.required],
      idbank: [0],
      cabangbank: [''],
      alamatbank: [''],
      norekbank: [''],
      namapemilik: [''],
      idjusaha: [0],
      alamat: [''],
      telepon: [''],
      npwp: [''],
      warganegara: [''],
      stpenduduk: [''],
      integrasibank: true
    });
  }
  ngOnInit(){
  }
  usahaChange(e: any){
    this.forms.patchValue({
      idjusaha : this.usahaSelected.idjusaha,
    });
  }
  bankChange(e: any){
    this.forms.patchValue({
      idbank: this.bankSelected.idbank,
      cabangbank: this.bankSelected.cabang ? this.bankSelected.cabang  : '-',
      alamatbank: this.bankSelected.alamat ? this.bankSelected.alamat : '-'
    });
  }
  onChangeWni(e: any){}
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tgldpa: this.forms.value.tgldpa !== null ? new Date(this.forms.value.tgldpa).toLocaleDateString('en-US') : null
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
  getUsaha(){
    this.usaha = [];
    this.usahaService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          this.usaha = [...resp];
          if(this.mode === 'edit'){
            this.usahaSelected = this.usaha.find(w => w.idjusaha == this.forms.value.idjusaha);
          }
        }
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
      })
  }
  getBank(){
    this.bank = [];
    this.bankService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          this.bank = [...resp];
          if(this.mode === 'edit'){
            this.bankSelected = this.bank.find(w => w.idbank == this.forms.value.idbank);
          }
        }
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
      })
  }
  onShow(){
    this.getUsaha();
    this.getBank();
  }
  onHide(){
    this.forms.reset();
    this.forms.patchValue({
      idphk3: 0,
      idunit: 0,
      idbank: 0,
      idjusaha: 0,
      integrasibank: true
    });
    this.usaha = [];
    this.bank = [];
    this.usahaSelected = null;
    this.bankSelected = null;
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
