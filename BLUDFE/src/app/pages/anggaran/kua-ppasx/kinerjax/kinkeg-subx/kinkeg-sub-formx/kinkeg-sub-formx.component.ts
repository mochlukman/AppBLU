import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { KinkegService } from 'src/app/core/services/kinkeg.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-kinkeg-sub-formx',
  templateUrl: './kinkeg-sub-formx.component.html',
  styleUrls: ['./kinkeg-sub-formx.component.scss']
})
export class KinkegSubFormxComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: KinkegService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idkinkeg: 0,
      idkegunit: [0, [Validators.required, Validators.min(1)]],
      kdjkk: ['', [Validators.required]],
      nomor: '',
      tolokur: '',
      target: [0, [Validators.required, Validators.min(1)]],
      targetx: 0,
      satuan: '',
      keterangan: '',
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit() {
  }
  get targetx(){
    return this.forms.get('targetx').value;
  }
  simpan() {
    if (this.forms.valid) {
      this.loading_post = true;
      if (this.mode === 'add') {
        this.service.post(this.forms.value).subscribe((resp) => {
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
          if (Array.isArray(error.error.error)) {
            this.msg = [];
            for (var i = 0; i < error.error.error.length; i++) {
              this.msg.push({ severity: 'error', summary: 'error', detail: error.error.error[i] });
            }
          } else {
            this.msg = [];
            this.msg.push({ severity: 'error', summary: 'error', detail: error.error });
          }
          this.loading_post = false;
        });
      } else if (this.mode === 'edit') {
        this.service.put(this.forms.value).subscribe((resp) => {
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
          if (Array.isArray(error.error.error)) {
            this.msg = [];
            for (var i = 0; i < error.error.error.length; i++) {
              this.msg.push({ severity: 'error', summary: 'error', detail: error.error.error[i] });
            }
          } else {
            this.msg = [];
            this.msg.push({ severity: 'error', summary: 'error', detail: error.error });
          }
          this.loading_post = false;
        });
      }
    }
  }
  onShow() {
  }
  onHide() {
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
