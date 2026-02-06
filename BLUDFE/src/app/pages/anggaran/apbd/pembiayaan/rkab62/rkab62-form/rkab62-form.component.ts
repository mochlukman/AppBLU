import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { RkabService } from 'src/app/core/services/rkab.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftrekForRkabCheckboxComponent } from 'src/app/shared/lookups/look-daftrek-for-rkab-checkbox/look-daftrek-for-rkab-checkbox.component';

@Component({
  selector: 'app-rkab62-form',
  templateUrl: './rkab62-form.component.html',
  styleUrls: ['./rkab62-form.component.scss']
})
export class Rkab62FormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: IDaftrekening[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookDaftrekForRkabCheckboxComponent, {static: true}) Daftrek : LookDaftrekForRkabCheckboxComponent;
  @ViewChild('dt', {static:true}) dt: any;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: RkabService
  ) {
    this.forms = this.fb.group({
      idrkab : 0,
      idrek : ['', Validators.required],
      nilai : 0,
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdtahap: ['', Validators.required],
      trkr: 2 // pengeluaran
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookRekening(){
    this.Daftrek.title = 'Pilih Rekening Pembiayaan';
    this.Daftrek._idunit = this.forms.value.idunit;
    this.Daftrek._kdtahap = this.forms.value.kdtahap;
    this.Daftrek._idjnsakun = 6;
    this.Daftrek._kdperStartwith = '6.2.'
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
