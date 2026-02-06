import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IBpk } from 'src/app/core/interface/ibpk';
import { BpkSpjService } from 'src/app/core/services/bpk-spj.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookBpkForSpjComponent } from 'src/app/shared/lookups/look-bpk-for-spj/look-bpk-for-spj.component';

@Component({
  selector: 'app-spj-pengajuan-detail-belanja-form',
  templateUrl: './spj-pengajuan-detail-belanja-form.component.html',
  styleUrls: ['./spj-pengajuan-detail-belanja-form.component.scss']
})
export class SpjPengajuanDetailBelanjaFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: IBpk[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookBpkForSpjComponent, {static: true}) Bpk : LookBpkForSpjComponent;
  @ViewChild('dt', {static:true}) dt: any;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: BpkSpjService,
  ) {
    this.forms = this.fb.group({
      idspj : [0, Validators.required],
      idunit : [0, Validators.required],
      kdstatus : ['', Validators.required],
      idbend : [0, Validators.required],
      idbpk: ''
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookBpk(){
    this.Bpk.title = 'Pilih Data BPK';
    this.Bpk.gets(this.forms.value.idspj, this.forms.value.idunit, this.forms.value.kdstatus, this.forms.value.idbend);
    this.Bpk.showThis = true;
  }
  callbackBpk(e: IBpk[]){
    if(e){
      this.listdata = [];
      this.listdata = [...e];
      let temp_bpk = this.listdata.map(m => m.idbpk);
      this.forms.patchValue({
        idbpk: temp_bpk
      });
    }
  }
  HapusBpk(e: IBpk){
    this.listdata = this.listdata.filter(f => f.idbpk !== e.idbpk);
    let temp_bpk = this.listdata.map(m => m.idbpk);
      this.forms.patchValue({
        idbpk: temp_bpk
      });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
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
    this.listdata = [];
  }
}
