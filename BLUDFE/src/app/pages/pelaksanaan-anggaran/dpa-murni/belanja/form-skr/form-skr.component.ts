import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { indoKalender } from 'src/app/core/local';
import { DpaService } from 'src/app/core/services/dpa.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-form-skr',
  templateUrl: './form-skr.component.html',
  styleUrls: ['./form-skr.component.scss']
})
export class FormSkrComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  constructor(
    private service: DpaService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idkeg: [0],
      iddpa: [0],
      idunit: [0, Validators.required],
      kdtahap: [0, Validators.required],
      idxkode: [0, Validators.required],
      idttd1: [''],
      idttd2: [''],
      nodpa: ['', Validators.required],
      tgldpa: [null, Validators.required],
      nosah: [''],
      keterangan: [''],
      tglsah: [null]
    });
    this.indoKalender = indoKalender;
  }

  ngOnInit(){
  }
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
  onShow(){
  }
  onHide(){
    this.forms.reset();
    this.forms.patchValue({
      iddpa: 0
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
