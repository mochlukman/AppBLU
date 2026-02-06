import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { RkadetbService } from 'src/app/core/services/rkadetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-rka62-penjabaran-formx',
  templateUrl: './rka62-penjabaran-formx.component.html',
  styleUrls: ['./rka62-penjabaran-formx.component.scss'],
  providers: [InputRupiahPipe]
})
export class Rka62PenjabaranFormxComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  isHeader: boolean;
  @Output() callback = new EventEmitter();
  constructor(
    private service: RkadetbService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idrkadetb: 0,
      idrkab: [0, [Validators.required, Validators.min(1)]],
      kdjabar: ['', Validators.required],
      uraian: '',
      satuan: '',
      tarif: 0,
      ekspresi: '',
      type: '',
      idrkadetbduk: 0
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit() {
  }
  typeChange(e: string) {
    if (e == 'H') {
      this.isHeader = true;
      this.forms.patchValue({
        satuan: '',
        tarif: 0,
        ekspresi: '',
      });
    } else {
      this.isHeader = false;
    }
  }
  simpan() {
    if (this.forms.valid) {
      this.loading_post = true;
      this.forms.get('type').enable();
      if (this.mode === 'add') {
        if(this.forms.value.idrkadetbduk == null){
          this.forms.patchValue({
            idrkadetbduk: 0
          });
        }
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
        if(this.forms.value.idrkadetbduk == null){
          this.forms.patchValue({
            idrkadetbduk: 0
          });
        }
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
    if(this.forms.value.type == 'H'){
      this.isHeader = true;
    }
    if(this.mode == 'edit'){
      this.forms.get('type').disable();
    }
  }
  onHide() {
    this.forms.reset(this.initialForm);
    this.msg = [];
    this.loading_post = false;
    this.isHeader = false;
    this.forms.get('type').enable();
    this.showThis = false;
  }
}
