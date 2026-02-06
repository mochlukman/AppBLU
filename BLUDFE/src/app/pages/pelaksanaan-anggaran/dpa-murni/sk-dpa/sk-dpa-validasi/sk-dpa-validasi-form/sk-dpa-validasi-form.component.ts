import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { indoKalender } from 'src/app/core/local';
import { DpaService } from 'src/app/core/services/dpa.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-sk-dpa-validasi-form',
  templateUrl: './sk-dpa-validasi-form.component.html',
  styleUrls: ['./sk-dpa-validasi-form.component.scss']
})
export class SkDpaValidasiFormComponent implements OnInit {
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
      tglsah: {value: null, disabled: true},
      sah: null,
      tglvalid: null,
      valid: null
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
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
      });
      this.forms.controls['tgldpa'].enable();
      this.forms.controls['tglsah'].enable();
      if(this.mode === 'edit'){
        this.service.penolakan(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callBack.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Validasi Data Berhasil');
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
    this.forms.get('sah').disable();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.forms.controls['tgldpa'].disable();
    this.forms.controls['tglsah'].disable();
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
