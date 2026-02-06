import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IBkusts } from 'src/app/core/interface/ibkusts';
import { BkustsspjtrService } from 'src/app/core/services/bkustsspjtr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookBkustsCheckboxComponent } from 'src/app/shared/lookups/look-bkusts-checkbox/look-bkusts-checkbox.component';

@Component({
  selector: 'app-spj-bku-penyetoran-form',
  templateUrl: './spj-bku-penyetoran-form.component.html',
  styleUrls: ['./spj-bku-penyetoran-form.component.scss']
})
export class SpjBkuPenyetoranFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: IBkusts[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookBkustsCheckboxComponent, {static: true}) BKUSTS : LookBkustsCheckboxComponent;
  @ViewChild('dt', {static:true}) dt: any;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: BkustsspjtrService,
  ) {
    this.forms = this.fb.group({
      idunit: [0, Validators.required],
      idbend: [0, Validators.required],
      idspjtr : [0, Validators.required],
      idbkusts: ''
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookBKUSTS(){
    this.BKUSTS.title = 'Pilih Data BKU Penyetoran';
    this.BKUSTS.getsForSpjtr(this.forms.value.idspjtr, this.forms.value.idunit,this.forms.value.idbend);
    this.BKUSTS.showThis = true;
  }
  callbackBKUSTS(e: IBkusts[]){
    if(e){
      this.listdata = [];
      this.listdata = [...e];
      let temp_data = this.listdata.map(m => m.idbkusts);
      this.forms.patchValue({
        idbkusts: temp_data
      });
    }
  }
  HapusBKUSTS(e: IBkusts){
    this.listdata = this.listdata.filter(f => f.idbkusts !== e.idbkusts);
    let temp_data = this.listdata.map(m => m.idbkusts);
      this.forms.patchValue({
        idbkusts: temp_data
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
