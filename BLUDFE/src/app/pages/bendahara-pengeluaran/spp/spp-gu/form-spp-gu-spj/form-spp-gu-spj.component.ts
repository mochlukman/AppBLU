import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { ISpjLookupForSpp } from 'src/app/core/interface/ispj';
import { ISpjspp } from 'src/app/core/interface/ispjspp';
import { SpjsppService } from 'src/app/core/services/spjspp.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookSpjForSppComponent } from 'src/app/shared/lookups/look-spj-for-spp/look-spj-for-spp.component';

@Component({
  selector: 'app-form-spp-gu-spj',
  templateUrl: './form-spp-gu-spj.component.html',
  styleUrls: ['./form-spp-gu-spj.component.scss']
})
export class FormSppGuSpjComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  @ViewChild(LookSpjForSppComponent,{static: true}) LookRek: LookSpjForSppComponent;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: SpjsppService
  ) {
    this.forms = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      idspp:[0, [Validators.required, Validators.min(1)]],
      idspj:[0, [Validators.required, Validators.min(1)]],
      nospj: '',
      tglspj: '',
      tglbuku: '',
      keterangan: '',
      kdstatus: ''
    });
  }
  ngOnInit(){
  }
  showSpj(){
    this.LookRek.title = 'Pilih SPJ';
    const params = {
      'Idunit': this.forms.value.idunit,
      'Idspp': this.forms.value.idspp,
      'Kdstatus': this.forms.value.kdstatus
    };
    this.LookRek.get(params);
    this.LookRek.showThis = true;
  }
  callbackSpj(e: ISpjLookupForSpp){
    this.forms.patchValue({
      idspj: e.idspj,
      nospj: e.nospj,
      tglspj: e.tglspj ? new Date(e.tglspj).toLocaleDateString('en-US') : '',
      tglbuku: e.tglbuku ? new Date(e.tglbuku).toLocaleDateString('en-US') : '',
      keterangan: e.keterangan,
    });
  }
  simpan(){
    this.loading_post = true;
    this.service.postFromSpp(this.forms.value).subscribe((resp) => {
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
  onShow(){
  }
  onHide(){
    this.forms.reset();
    this.forms.patchValue({
      idunit: 0,
      idspp:0,
      kdstatus: '',
      idspj:0,
      nospj: '',
      tglspj: '',
      tglbuku: '',
      keterangan: '',
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
