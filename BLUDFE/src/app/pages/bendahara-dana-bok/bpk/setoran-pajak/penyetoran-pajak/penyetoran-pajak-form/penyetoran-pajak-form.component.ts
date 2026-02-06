import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { indoKalender } from 'src/app/core/local';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message, SelectItem} from 'primeng/api';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {BpkpajakstrService} from 'src/app/core/services/bpkpajakstr.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {StattrsService} from 'src/app/core/services/stattrs.service';

@Component({
  selector: 'app-penyetoran-pajak-form',
  templateUrl: './penyetoran-pajak-form.component.html',
  styleUrls: ['./penyetoran-pajak-form.component.scss']
})
export class PenyetoranPajakFormComponent implements OnInit {
  showThis: boolean;
  loading_post: boolean;
  title: string;
  mode: string;
  forms: FormGroup
  msg: Message[];
  indoKalender: any;
  userInfo: ITokenClaim;
  initialForm: any;
  @Output() callback = new EventEmitter();
  listStattrs: SelectItem[] = [];
  stattrsSelected: any;
  constructor(
    private service: BpkpajakstrService,
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService,
    private stattrsService: StattrsService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idbpkpajakstr : 0,
      idunit : [0, [Validators.required, Validators.min(1)]],
      idbend : [0, [Validators.required, Validators.min(1)]],
      uraian : '',
      nomor : '',
      tanggal : null,
      kdstatus : ['', Validators.required]
    });
    this.initialForm = this.forms.value;
  }
  getStattrs(){
    this.listStattrs = [
      {label: 'Pilih', value: null}
    ];
    this.listStattrs = [];
    this.stattrsService.getBylist('36')
      .subscribe(resp => {
        if(resp.length > 0){
          resp.forEach(x => {
            this.listStattrs.push({label: x.uraian , value:x.kdstatus.trim()});
          });
          if(this.mode === 'edit'){
            this.stattrsSelected = this.listStattrs.find(w => w.value == this.forms.value.kdstatus).value;
          }
        }
      },(error) => {
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
      });
  }
  changeStattrs(e: any){
    this.forms.patchValue({
      kdstatus: e.value,
    });
  }
  ngOnInit() {
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tanggal: this.forms.value.tanggal !== null ? new Date(this.forms.value.tanggal).toLocaleDateString('en-US') : null
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
    this.getStattrs();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.msg = [];
    this.loading_post = false;
    this.stattrsSelected = null;
    this.listStattrs = [];
    this.showThis = false;
  }
}
