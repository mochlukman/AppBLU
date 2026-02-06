import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkpajakstrdetService } from 'src/app/core/services/bpkpajakstrdet.service';

@Component({
  selector: 'app-penyetoran-pajak-rincian-detail-form',
  templateUrl: './penyetoran-pajak-rincian-detail-form.component.html',
  styleUrls: ['./penyetoran-pajak-rincian-detail-form.component.scss']
})
export class PenyetoranPajakRincianDetailFormComponent implements OnInit {
  showThis: boolean;
  loading_post: boolean;
  title: string;
  mode: string;
  forms: FormGroup
  msg: Message[];
  userInfo: ITokenClaim;
  initialForm: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: BpkpajakstrdetService,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { 
    this.userInfo = this.authService.getTokenInfo();
    this.forms = this.fb.group({
      idbpkpajakstrdet : [0, [Validators.required, Validators.min(1)]],
      nilai : 0,
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit() {
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      if(this.mode === 'edit'){
        this.service.put(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
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
    this.msg = [];
    this.loading_post = false;
    this.showThis = false;
  }
}
