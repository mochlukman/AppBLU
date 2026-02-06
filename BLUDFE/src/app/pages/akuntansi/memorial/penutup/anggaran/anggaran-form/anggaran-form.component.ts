import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { IfService } from 'src/app/core/services/if.service';

@Component({
  selector: 'app-anggaran-form',
  templateUrl: './anggaran-form.component.html',
  styleUrls: ['./anggaran-form.component.scss']
})
export class AnggaranFormComponent implements OnInit {
  showthis: boolean;
  loadingpost: boolean;
  title: string;
  mode: string;
  msg: Message[];
  indoKalender: any;
  unitselected: IDaftunit;
  forms: FormGroup;
  initialForm: any;
  userInfo: ITokenClaim;
  @Output() callback = new EventEmitter();
  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private service: IfService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idbm : 0,
      idunit : [0, [Validators.required, Validators.min(1)]],
      nobm : ['', Validators.required],
      idjbm : [0, [Validators.required, Validators.min(1)]],
      referensi: '',
      uraian : ['', Validators.required],
      tglbm : null,
      tglvalid: null,
      penutup: false // ini unutk menu penutup anggaran
    });
    this.initialForm = this.forms.value;
  }

  ngOnInit() {
  }
  simpan(){
    if(this.forms.valid){
      this.loadingpost = true;
      this.forms.patchValue({
        tglbm: this.forms.value.tglbm !== null ? new Date(this.forms.value.tglbm).toLocaleDateString('en-US') : null,
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
      });
      if(this.mode === 'add'){
        this.service.post(`Bktmem`, this.forms.value).subscribe((resp) => {
          if (resp) {
            this.callback.emit({
              added: true,
              data: resp
            });
            this.onHide();
          }
          this.loadingpost = false;
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
          this.loadingpost = false;
        });
      } else if(this.mode === 'edit'){
        this.service.put(`Bktmem`, this.forms.value).subscribe((resp) => {
          if (resp) {
            this.callback.emit({
              edited: true,
              data: resp
            });
            this.onHide();;
          }
          this.loadingpost = false;
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
          this.loadingpost = false;
        });
      }
    }
  }
  onShow(){
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showthis = false;
  }
}
