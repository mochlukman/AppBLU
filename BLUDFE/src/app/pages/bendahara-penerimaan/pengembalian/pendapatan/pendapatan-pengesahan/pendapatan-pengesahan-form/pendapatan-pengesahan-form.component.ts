import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftphk3 } from 'src/app/core/interface/idaftphk3';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpmService } from 'src/app/core/services/spm.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pendapatan-pengesahan-form',
  templateUrl: './pendapatan-pengesahan-form.component.html',
  styleUrls: ['./pendapatan-pengesahan-form.component.scss']
})
export class PendapatanPengesahanFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  indoKalender: any;
  nmstatus: string;
  userInfo: ITokenClaim;
  validasi: boolean;
  uiPhk3: IDisplayGlobal;
  phk3Selected: IDaftphk3;
  initialform: any;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  constructor(
    private service: SpmService,
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService,
    private stattrsService: StattrsService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.forms = this.fb.group({
      idspm: 0,
      idunit : [0, [Validators.required, Validators.min(1)]],
      nospm : ['', Validators.required],
      kdstatus : ['', Validators.required],
      idbend : null,
      idphk3 : null,
      idxkode : [0, Validators.required],
      noreg : '',
      ketotor : '',
      idkontrak : null,
      keperluan : '',
      tglspm : {value: null, disabled: true},
      nospd: '',
      tglspd: null,
      nokontrak: '',
      nmphk3: '',
      nminst: '',
      tglvalid: null,
      valid: null,
      validasi: ''
    });
    this.indoKalender = indoKalender;
    this.uiPhk3 = {kode: '', nama: ''};
    this.initialform = this.forms.value;
    this.uiBend = {kode: '', nama: ''};
  }

  ngOnInit(){
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
      });
      this.forms.controls['tglspm'].enable();
      if(this.mode === 'edit'){
        this.service.pengesahan(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              edited: true,
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
    if(this.mode == 'edit'){
      this.stattrsService.get(this.forms.value.kdstatus.trim())
          .subscribe(resp => this.nmstatus = resp.lblstatus.trim());
    }
  }
  onHide(){
    this.forms.reset(this.initialform);
    this.forms.controls['tglspm'].disable();
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.nmstatus = '';
    this.validasi = false;
    this.uiPhk3 = {kode: '', nama: ''};
    this.phk3Selected = null;
    this.uiBend = {kode: '', nama: ''};
    this.bendSelected = null;
  }
}
