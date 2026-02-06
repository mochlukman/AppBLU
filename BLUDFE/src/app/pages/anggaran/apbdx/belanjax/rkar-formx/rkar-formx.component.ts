import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { RkarService } from 'src/app/core/services/rkar.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftrekForRkarCheckboxComponent } from 'src/app/shared/lookups/look-daftrek-for-rkar-checkbox/look-daftrek-for-rkar-checkbox.component';

@Component({
  selector: 'app-rkar-formx',
  templateUrl: './rkar-formx.component.html',
  styleUrls: ['./rkar-formx.component.scss']
})
export class RkarFormxComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: IDaftrekening[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookDaftrekForRkarCheckboxComponent, {static: true}) Daftrek : LookDaftrekForRkarCheckboxComponent;
  @ViewChild('dt', {static:true}) dt: any;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: RkarService
  ) {
    this.forms = this.fb.group({
      idrkad : 0,
      idrek : ['', Validators.required],
      nilai : 0,
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdtahap: ['', Validators.required],
      idkeg: [0, [Validators.required, Validators.min(1)]],
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookRekening(){
    this.Daftrek.title = 'Pilih Rekening Belanja';
    this.Daftrek._idunit = this.forms.value.idunit;
    this.Daftrek._kdtahap = this.forms.value.kdtahap;
    this.Daftrek._idjnsakun = 5;
    this.Daftrek._idkeg = this.forms.value.idkeg;
    this.Daftrek.showThis = true;
  }
  callbackRekenning(e: IDaftrekening[]){
    if(e){
      this.listdata = [];
      this.listdata = [...e];
      let temp_rek = this.listdata.map(m => m.idrek);
      this.forms.patchValue({
        idrek: temp_rek
      });
    }
  }
  HapusRek(e: IDaftrekening){
    this.listdata = this.listdata.filter(f => f.idrek !== e.idrek);
    let temp_rek = this.listdata.map(m => m.idrek);
      this.forms.patchValue({
        idrek: temp_rek
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