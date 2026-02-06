import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IBkutbp } from 'src/app/core/interface/ibkutbp';
import { IBkutbpspjtr } from 'src/app/core/interface/ibkutbpspjtr';
import { BkutbpspjtrService } from 'src/app/core/services/bkutbpspjtr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookBkutbpCheckboxComponent } from 'src/app/shared/lookups/look-bkutbp-checkbox/look-bkutbp-checkbox.component';

@Component({
  selector: 'app-spj-bku-penerimaan-form',
  templateUrl: './spj-bku-penerimaan-form.component.html',
  styleUrls: ['./spj-bku-penerimaan-form.component.scss']
})
export class SpjBkuPenerimaanFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: IBkutbp[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookBkutbpCheckboxComponent, {static: true}) BKUTBP : LookBkutbpCheckboxComponent;
  @ViewChild('dt', {static:true}) dt: any;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: BkutbpspjtrService,
  ) {
    this.forms = this.fb.group({
      idunit: [0, Validators.required],
      idbend: [0, Validators.required],
      idspjtr : [0, Validators.required],
      idbkutbp: ''
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookBKUTBP(){
    this.BKUTBP.title = 'Pilih Data BKU Penerimaan';
    this.BKUTBP.getsForSpjtr(this.forms.value.idspjtr, this.forms.value.idunit,this.forms.value.idbend);
    this.BKUTBP.showThis = true;
  }
  callbackBKUTBP(e: IBkutbp[]){
    if(e){
      this.listdata = [];
      this.listdata = [...e];
      let temp_data = this.listdata.map(m => m.idbkutbp);
      this.forms.patchValue({
        idbkutbp: temp_data
      });
    }
  }
  HapusBKUTBP(e: IBkutbp){
    this.listdata = this.listdata.filter(f => f.idbkutbp !== e.idbkutbp);
    let temp_data = this.listdata.map(m => m.idbkutbp);
      this.forms.patchValue({
        idbkutbp: temp_data
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
