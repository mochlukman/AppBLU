import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { LpjService } from 'src/app/core/services/lpj.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-lpj-pengajuan-form',
  templateUrl: './lpj-pengajuan-form.component.html',
  styleUrls: ['./lpj-pengajuan-form.component.scss']
})
export class LpjPengajuanFormComponent implements OnInit {
  showThis: boolean;
  loading_post: boolean;
  title: string;
  mode: string;
  forms: FormGroup;
  msg: Message[];
  indoKalender: any;
  initialForm: any;
  @Output() callback = new EventEmitter();
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  constructor(
    private service: LpjService,
    private notif: NotifService,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idlpj : 0,
      idunit : [0, [Validators.required, Validators.min(1)]],
      nolpj : ['', Validators.required],
      idttd : 0,
      idxkode : 2,
      idbend : [0, [Validators.required, Validators.min(1)]],
      kdstatus : null,
      tgllpj : null,
      tglbuku: null,
      nosah: '',
      tglsah: null,
      tglvalid: null,
      keterangan: ''

    });
    this.initialForm = this.forms.value;
  }
  ngOnInit() {
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tgllpj: this.forms.value.tgllpj !== null ? new Date(this.forms.value.tgllpj).toLocaleDateString('en-US') : null,
        tglbuku: this.forms.value.tglbuku !== null ? new Date(this.forms.value.tglbuku).toLocaleDateString('en-US') : null
      });
      if(this.mode === 'add'){
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
            this.callback.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Ubah Data Berhasil');
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
    if(this.mode == 'add'){
      this.forms.patchValue({
        nolpj: `XXXXX/LPJ/${this.unitSelected.kdunit}/B02/${this.userInfo.NmTahun}`,
      });
    }
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.loading_post = false;
    this.unitSelected = null;
  }
}
