import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { ISpj } from 'src/app/core/interface/ispj';
import { SpjLpjService } from 'src/app/core/services/spj-lpj.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookSpjForLpjCheckBoxComponent } from 'src/app/shared/lookups/look-spj-for-lpj-check-box/look-spj-for-lpj-check-box.component';

@Component({
  selector: 'app-lpj-pengajuan-rincian-form',
  templateUrl: './lpj-pengajuan-rincian-form.component.html',
  styleUrls: ['./lpj-pengajuan-rincian-form.component.scss']
})
export class LpjPengajuanRincianFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: ISpj[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookSpjForLpjCheckBoxComponent, {static: true}) SPJ : LookSpjForLpjCheckBoxComponent;
  @ViewChild('dt', {static:true}) dt: any;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: SpjLpjService,
  ) {
    this.forms = this.fb.group({
      idlpj : [0, Validators.required],
      idunit : [0, Validators.required],
      idbend : [0, Validators.required],
      idspj: ''
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookSPJ(){
    this.SPJ.title = 'Pilih Data SPJ';
    this.SPJ.gets(this.forms.value.idlpj, this.forms.value.idunit,this.forms.value.idbend, '');
    this.SPJ.showThis = true;
  }
  callbackSPJ(e: ISpj[]){
    if(e){
      this.listdata = [];
      this.listdata = [...e];
      let temp_spj = this.listdata.map(m => m.idspj);
      this.forms.patchValue({
        idspj: temp_spj
      });
    }
  }
  HapusBpk(e: ISpj){
    this.listdata = this.listdata.filter(f => f.idspj !== e.idspj);
    let temp_spj = this.listdata.map(m => m.idspj);
      this.forms.patchValue({
        idspj: temp_spj
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
