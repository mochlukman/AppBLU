import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { indoKalender } from 'src/app/core/local';
import { DpaService } from 'src/app/core/services/dpa.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-sk-dpa-pengesahan-form',
  templateUrl: './sk-dpa-pengesahan-form.component.html',
  styleUrls: ['./sk-dpa-pengesahan-form.component.scss']
})
export class SkDpaPengesahanFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  constructor(
    private service: DpaService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      iddpa: [0],
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdtahap: ['', Validators.required],
      idxkode: [0, Validators.required],
      nodpa: ['', Validators.required],
      tgldpa: {value: null, disabled: true},
      keterangan: '',
      jdpa: 0,
      tglsah: null,
      sah: null
    });
    this.indoKalender = indoKalender;
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglsah: this.forms.value.tglsah !== null ? new Date(this.forms.value.tglsah).toLocaleDateString('en-US') : null
      });
      this.forms.controls['tgldpa'].enable();
      if(this.mode === 'edit'){
        this.service.pengesahan(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callBack.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Pengesahan Data Berhasil');
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
    this.forms.controls['tgldpa'].disable();
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
