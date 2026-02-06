import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Message} from 'primeng/api';
import { indoKalender } from 'src/app/core/local';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {Sp2bService} from 'src/app/core/services/sp2b.service';

@Component({
  selector: 'app-sp2b-form',
  templateUrl: './sp2b-form.component.html',
  styleUrls: ['./sp2b-form.component.scss']
})
export class Sp2bFormComponent implements OnInit {
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
    private service: Sp2bService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idsp2b: 0,
      idunit: [0, [Validators.required, Validators.min(1)]],
      nosp2b: ["", Validators.required],
      tglsp2b: [null, Validators.required],
      uraian: "",
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
        tglsp2b: this.forms.value.tglsp2b !== null ? new Date(this.forms.value.tglsp2b).toLocaleDateString('en-US') : null
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
      }
    }
  }
  onShow(){
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
