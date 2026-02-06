import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { indoKalender } from 'src/app/core/local';
import {Message} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Sp3bService} from 'src/app/core/services/sp3b.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-sp3b-form-sah',
  templateUrl: './sp3b-form-sah.component.html',
  styleUrls: ['./sp3b-form-sah.component.scss']
})
export class Sp3bFormSahComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  initialForm: any;
  constructor(
    private service: Sp3bService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idsp3b: 0,
      idunit: [0, [Validators.required, Validators.min(1)]],
      nosp3b: ["", Validators.required],
      tglsp3b: {value: null, disabled: true},
      uraisp3b: "",
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
      this.forms.controls['tglsp3b'].enable();
      if(this.mode === 'edit'){
        this.service.pengesahan(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callBack.emit({
              added: true,
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
    this.forms.controls['tglsp3b'].disable();
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
