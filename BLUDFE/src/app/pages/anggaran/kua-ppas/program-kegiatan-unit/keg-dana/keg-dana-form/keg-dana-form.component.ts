import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IJdana } from 'src/app/core/interface/ijdana';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { KegsbdanaService } from 'src/app/core/services/kegsbdana.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookJdanaComponent } from 'src/app/shared/lookups/look-jdana/look-jdana.component';

@Component({
  selector: 'app-keg-dana-form',
  templateUrl: './keg-dana-form.component.html',
  styleUrls: ['./keg-dana-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class KegDanaFormComponent implements OnInit {
  loading_post: boolean;
  uiJdana: IDisplayGlobal;
  jdanaSelected: IJdana;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  @Output() callback = new EventEmitter();
  @ViewChild(LookJdanaComponent, {static: true}) Jdana : LookJdanaComponent;
  constructor(
    private service: KegsbdanaService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idkegdana : 0,
      idkegunit : [0, [Validators.required, Validators.min(1)]],
      idjdana : [0, [Validators.required, Validators.min(1)]],
      nilai : 0

    });
    this.initialForm = this.forms.value;
    this.uiJdana = {kode: '', nama: ''};
  }
  ngOnInit(){
  }
  lookJdana(){
    this.Jdana.title = 'Pilih Jenis Dana';
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
      this.forms.patchValue({
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
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
      } else if(this.mode === 'edit'){
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
    }
  }
  onShow(){
  }
  onHide(){
    this.uiJdana = {kode: '', nama: ''};
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.jdanaSelected = null;
  }
}
