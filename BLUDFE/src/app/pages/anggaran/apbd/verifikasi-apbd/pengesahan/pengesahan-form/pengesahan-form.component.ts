import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IPegawai } from 'src/app/core/interface/ipegawai';
import { indoKalender } from 'src/app/core/local';
import { RkasahService } from 'src/app/core/services/rkasah.service';
import { LookPegawaiComponent } from 'src/app/shared/lookups/look-pegawai/look-pegawai.component';

@Component({
  selector: 'app-pengesahan-form',
  templateUrl: './pengesahan-form.component.html',
  styleUrls: ['./pengesahan-form.component.scss']
})
export class PengesahanFormComponent implements OnInit {
  showThis: boolean;
  loading_post: boolean;
  title: string;
  mode: string;
  forms: FormGroup;
  msg: Message[];
  indoKalender: any;
  initialForm: any;
  uiTapd: IDisplayGlobal;
  tapdSelected: IPegawai;
  @Output() callback = new EventEmitter();
  @ViewChild(LookPegawaiComponent,{static: true}) ref: LookPegawaiComponent;
  constructor(
    private service: RkasahService,
    private fb: FormBuilder
  ) {
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idrkasah : 0,
      idunit :[0, [Validators.required, Validators.min(1)]],
      idpeg :[0, [Validators.required, Validators.min(1)]],
      kdtahap : ['', Validators.required],
      uraian : '',
      tglsah : null
    });
    this.initialForm = this.forms.value;
    this.uiTapd = {kode: '', nama: ''};
  }
  ngOnInit() {
  }
  lookRef(){
    this.ref.title = 'Pilih TAPD';
    this.ref.showThis = true;
    this.ref.gets(this.forms.value.idunit);
  }
  callbackRef(e: IPegawai){
    this.tapdSelected = e;
    this.uiTapd = {kode: e.nip, nama: e.nama};
    this.forms.patchValue({
      idpeg: this.tapdSelected.idpeg
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglsah: this.forms.value.tglsah !== null ? new Date(this.forms.value.tglsah).toLocaleDateString('en-US') : null,
      });
      if(this.mode === 'add'){
        this.service.post(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              added: true,
              data: resp.body
            });
            this.onHide();
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
      } else if(this.mode == 'edit'){
        this.service.put(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
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
    } else {
      this.msg = [];
      this.msg.push({severity: 'error', summary: 'error', detail: 'Lengkapi Form'});
    }
  }
  onShow(){
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.uiTapd = {kode: '', nama: ''};
    this.tapdSelected = null;
    this.msg = [];
  }
}
