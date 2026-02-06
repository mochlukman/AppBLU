import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { IfService } from 'src/app/core/services/if.service';

@Component({
  selector: 'app-jurnal-memorial-form',
  templateUrl: './jurnal-memorial-form.component.html',
  styleUrls: ['./jurnal-memorial-form.component.scss']
})
export class JurnalMemorialFormComponent implements OnInit {
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
  getjenisbukti: boolean;
  jenisbukti: string;
  @Output() callback = new EventEmitter();
  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private service: IfService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idbm : [0, [Validators.required, Validators.min(1)]],
      idunit : 0,
      nobm : '',
      idjbm : 0,
      referensi: '',
      uraian : '',
      tglbm : {value:null, disabled: true},
      tglvalid: {value:null, disabled: true},
      valid: null
    });
    this.initialForm = this.forms.value;
  }

  ngOnInit() {
  }
  callbackJenisBukti(data: any){
    if(data){
      this.forms.patchValue({
        idjbm: data.idjbm,
        nobm: `XXXXX/BKTM/${this.unitselected.kdunit}/${data.kdbm.trim()}/${this.userInfo.NmTahun}`,
      });
    } else {
      this.forms.patchValue({
        idjbm: 0,
        nobm: ''
      });
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Jenis Bukti'});
    }
  }
  changeValid(e: any){
    if(e.checked){
      this.forms.controls['tglvalid'].enable();
    } else {
      this.forms.patchValue({
        tglvalid: null
      });
      this.forms.controls['tglvalid'].disable();
    }
  }
  simpan(){
    if(this.forms.valid){
      this.loadingpost = true;
      this.forms.controls['tglvalid'].enable();
      this.forms.patchValue({
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
      });
      if(this.mode === 'validasi'){
        this.service.post(`Bktmem/Validasi`, this.forms.value).subscribe((resp) => {
          if (resp) {
            this.callback.emit({
              validasi: true,
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
      }
    }
  }
  onShow(){
    if(this.forms.controls['valid'].value == true){
      this.forms.controls['tglvalid'].enable();
    } else {
      this.forms.controls['tglvalid'].disable();
    }
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showthis = false;
    this.getjenisbukti = false;
  }
}
