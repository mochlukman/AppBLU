import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IStattrs } from 'src/app/core/interface/istattrs';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpjtrService } from 'src/app/core/services/spjtr.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-spj-pengajuan-form',
  templateUrl: './spj-pengajuan-form.component.html',
  styleUrls: ['./spj-pengajuan-form.component.scss']
})
export class SpjPengajuanFormComponent implements OnInit {
  showThis: boolean;
  loading_post: boolean;
  title: string;
  mode: string;
  forms: FormGroup;
  msg: Message[];
  indoKalender: any;
  initialForm: any;
  uiRef: IDisplayGlobal;
  listStattrs: SelectItem[] = [];
  stattrsSelected: any;
  @Output() callback = new EventEmitter();
  jenisBukti: string;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  constructor(
    private service: SpjtrService,
    private notif: NotifService,
    private fb: FormBuilder,
    private stattrsService: StattrsService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idspjtr : 0,
      idunit : [0, [Validators.required, Validators.min(1)]],
      nospj : ['', Validators.required],
      idttd : 0,
      idxkode : 1,
      idbend : [0, [Validators.required, Validators.min(1)]],
      kdstatus : ['', Validators.required],
      tglspj : null,
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
  getStattrs(){
    this.listStattrs = [
      {label: 'Pilih', value: null}
    ];
    this.stattrsService.getBylist('60,61,64')
      .subscribe(resp => {
        let tempjBukti: IStattrs[] = [];
        if(resp.length > 0 ){
          tempjBukti = resp;
          tempjBukti.forEach(e => {
            this.listStattrs.push({label: `${e.lblstatus} : ${e.uraian}`, value: e.kdstatus})
          });
        }
        if(this.mode === 'edit'){
          if(this.forms.value.kdstatus != null && this.forms.value.kdstatus != ''){
            this.stattrsSelected = this.listStattrs.find(w => w.value == this.forms.value.kdstatus).value;
            if(tempjBukti.length > 0){
              let jbukti = tempjBukti.find(f => f.kdstatus.trim() == this.forms.value.kdstatus.trim());
              if(jbukti != null){
                this.jenisBukti =  `${jbukti.lblstatus} : ${jbukti.uraian}`;
              }
            }

          }
        }
      });
  }
  changeStattrs(e: any){
    if(e.value){
      let label = this.listStattrs.find(f => f.value == e.value);
      let label_split = label.label.split(':');
      this.forms.patchValue({
        kdstatus:  e.value,
        nospj: `XXXXX/SPJ-TR${e.value.trim()}/${this.unitSelected.kdunit}/${this.userInfo.NmTahun}`,
      });
    } else {
      this.forms.patchValue({
        kdstatus: '',
        nospj: '',
      });
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Jenis Bukti'});
    }
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglspj: this.forms.value.tglspj !== null ? new Date(this.forms.value.tglspj).toLocaleDateString('en-US') : null,
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
    this.getStattrs();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.loading_post = false;
    this.stattrsSelected = null;
    this.unitSelected = null;
    this.jenisBukti = '';
    this.msg = [];
  }
}
