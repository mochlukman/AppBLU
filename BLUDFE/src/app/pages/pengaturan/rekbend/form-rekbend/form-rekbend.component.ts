import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { IDaftbank } from 'src/app/core/interface/idaftbank';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IJbend } from 'src/app/core/interface/ijbend';
import { IPegawai } from 'src/app/core/interface/ipegawai';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { BendService } from 'src/app/core/services/bend.service';
import { DaftbankService } from 'src/app/core/services/daftbank.service';
import { JbendService } from 'src/app/core/services/jbend.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookPegawaiComponent } from 'src/app/shared/lookups/look-pegawai/look-pegawai.component';

@Component({
  selector: 'app-form-rekbend',
  templateUrl: './form-rekbend.component.html',
  styleUrls: ['./form-rekbend.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormRekbendComponent implements OnInit {
  loading_post: boolean;
  uiPeg: IDisplayGlobal;
  pegawaiSelected: IPegawai;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  idunit: number;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  jenisBend: SelectItem[] = [];
  jenisbendSelected: IJbend;
  listJbend: IJbend[] = [];
  bank:SelectItem[] = [];
  bankSelected: IDaftbank;
  listBank: IDaftbank[] = [];
  @ViewChild(LookPegawaiComponent, {static: true}) Pegawai : LookPegawaiComponent;
  constructor(
    private service: BendService,
    private fb: FormBuilder,
    private notif: NotifService,
    private jbendSerive: JbendService,
    private daftbankService: DaftbankService
  ) {
    this.forms = this.fb.group({
      idbend : 0,
      idpemda : 0,
      jnsbend : ['', Validators.required],
      idpeg : [0, Validators.required],
      idbank : [0, Validators.required],
      nmcabbank : '',
      rekbend : '',
      npwpbend : '',
      jabbend : '',
      saldobankup : 0,
      saldobankpajak : 0,
      saldotunaiup : 0,
      saldotunaipajak : 0,
      tglstopbend : null,
      warganegara : '',
      stpendududuk : '',
      staktif : 0,
      datecreate : null
    });
    this.uiPeg = {kode: '', nama: ''};
  }
  ngOnInit(){
  }
  lookPegawai(){
    this.Pegawai.title = 'Pilih Pegawai';
    this.Pegawai.gets(this.idunit);
    this.Pegawai.showThis = true;
  }
  callbackPegawai(e: IPegawai){
    this.pegawaiSelected = e;
    this.uiPeg = {kode: e.nip != '' ? e.nip.trim() : '', nama: e.nama};
    this.forms.patchValue({
      idpeg: e.idpeg
    });
  }
  getJbend(){
    this.jenisBend = [];
    this.jbendSerive.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          this.listJbend = [...resp];
          resp.forEach(x => {
            this.jenisBend.push({label: x.jnsbend +' - '+ x.uraibend, value:x.jnsbend.trim()});
          });
          if(this.mode === 'edit'){
            this.jenisbendSelected = this.jenisBend.find(w => w.value == this.forms.value.jnsbend).value;
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
  changeJbend(e: any){
    this.forms.patchValue({
      jnsbend: e.value
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
    const bankSelect = this.listBank.find(w => w.idbank == e.value);
    this.forms.patchValue({
      idbank: e.value,
      nmcabbank: bankSelect.akbank
    });

  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tgltagihan: this.forms.value.tgltagihan !== null ? new Date(this.forms.value.tgltagihan).toLocaleDateString('en-US') : null
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
    this.getBank();
    this.getJbend();
  }
  onHide(){
    this.uiPeg = {kode: '', nama: ''};
    this.forms.reset();
    this.forms.patchValue({
      idbend : 0,
      idpemda : 0,
      jnsbend : '',
      idpeg : 0,
      idbank : 0,
      nmcabbank : '',
      rekbend : '',
      npwpbend : '',
      jabbend : '',
      saldobankup : 0,
      saldobankpajak : 0,
      saldotunaiup : 0,
      saldotunaipajak : 0,
      tglstopbend : null,
      warganegara : '',
      stpendududuk : '',
      staktif : 0,
      datecreate : null
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.pegawaiSelected = null;
    this.idunit = 0;
    this.listBank = [];
    this.listJbend = [];
    this.bankSelected = null;
    this.jenisbendSelected = null;
  }
}

