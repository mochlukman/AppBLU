import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { DparService } from 'src/app/core/services/dpar.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-form-dpar',
  templateUrl: './form-dpar.component.html',
  styleUrls: ['./form-dpar.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormDparComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  constructor(
    private service: DparService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      iddpar: [0],
      iddpa: [0, Validators.required],
      kdtahap: ['', Validators.required],
      idrek: [0, Validators.required],
      idkeg: [0, Validators.required],
      nilai: [0],
      upGu : [0],
      ls : [0],
      tu : [0],
    });
  }

  ngOnInit(){
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
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
      iddpar: 0,
      iddpa: 0,
      kdtahap: '',
      idrek: 0,
      idkeg: 0,
      nilai: 0,
      upGu : 0,
      ls : 0,
      tu : 0,
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}