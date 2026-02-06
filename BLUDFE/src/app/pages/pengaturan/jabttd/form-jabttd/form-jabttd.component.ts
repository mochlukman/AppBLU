import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftdok } from 'src/app/core/interface/idaftdok';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IPegawai } from 'src/app/core/interface/ipegawai';
import { JabttdService } from 'src/app/core/services/jabttd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftdokComponent } from 'src/app/shared/lookups/look-daftdok/look-daftdok.component';
import { LookPegawaiComponent } from 'src/app/shared/lookups/look-pegawai/look-pegawai.component';

@Component({
  selector: 'app-form-jabttd',
  templateUrl: './form-jabttd.component.html',
  styleUrls: ['./form-jabttd.component.scss']
})
export class FormJabttdComponent implements OnInit {
  loading_post: boolean;
  uiDok: IDisplayGlobal;
  dokSelected: IDaftdok;
  uiPeg: IDisplayGlobal;
  pegawaiSelected: IPegawai;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  @ViewChild(LookDaftdokComponent, {static: true}) Dokumen : LookDaftdokComponent;
  @ViewChild(LookPegawaiComponent, {static: true}) Pegawai : LookPegawaiComponent;
  constructor(
    private service: JabttdService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idttd : 0,
      idunit : 0,
      idpeg : [0, Validators.required],
      kddok : ['', Validators.required],
      jabatan : '',
      noskpttd : '',
      tglskpttd : null,
      noskstopttd : '',
      tglskstopttd : null
    });
    this.uiDok = {kode: '', nama: ''};
    this.uiPeg = {kode: '', nama: ''};
  }
  ngOnInit(){
  }
  lookDokumen(){
    this.Dokumen.title = 'Pilih Dokumen';
    this.Dokumen.gets();
    this.Dokumen.showThis = true;
  }
  callbackDokumen(e: IDaftdok){
    this.dokSelected = e;
    this.uiDok = {kode: e.kddok, nama: e.nmdok};
    this.forms.patchValue({
      kddok: e.kddok
    });
  }
  lookPegawai(){
    this.Pegawai.title = 'Pilih Pegawai';
    this.Pegawai.getsByPemda();
    this.Pegawai.showThis = true;
  }
  callbackPegawai(e: IPegawai){
    this.pegawaiSelected = e;
    this.uiPeg = {kode: e.nip != '' ? e.nip.trim() : '', nama: e.nama};
    this.forms.patchValue({
      idpeg: e.idpeg,
      jabatan: e.jabatan,
      idunit: e.idunit
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
  }
  onHide(){
    this.uiDok = {kode: '', nama: ''};
    this.uiPeg = {kode: '', nama: ''};
    this.forms.reset();
    this.forms.patchValue({
      idttd : 0,
      idunit : 0,
      idpeg : 0,
      kddok : 0,
      jabatan : '',
      noskpttd : '',
      tglskpttd : null,
      noskstopttd : '',
      tglskstopttd : null
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.dokSelected = null;
    this.pegawaiSelected = null;
  }
}
