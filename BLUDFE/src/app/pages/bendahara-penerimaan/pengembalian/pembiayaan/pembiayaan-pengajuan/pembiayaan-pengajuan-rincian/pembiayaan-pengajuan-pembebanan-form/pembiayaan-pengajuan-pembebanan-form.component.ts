import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { ISpm } from 'src/app/core/interface/ispm';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { SpmdetbService } from 'src/app/core/services/spmdetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftrekByspmdetbCheckboxComponent } from 'src/app/shared/lookups/look-daftrek-byspmdetb-checkbox/look-daftrek-byspmdetb-checkbox.component';

@Component({
  selector: 'app-pembiayaan-pengajuan-pembebanan-form',
  templateUrl: './pembiayaan-pengajuan-pembebanan-form.component.html',
  styleUrls: ['./pembiayaan-pengajuan-pembebanan-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class PembiayaanPengajuanPembebananFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: IDaftrekening[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookDaftrekByspmdetbCheckboxComponent, {static: true}) Daftrek : LookDaftrekByspmdetbCheckboxComponent;
  @ViewChild('dt', {static:true}) dt: any;
  spmSelected: ISpm;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: SpmdetbService
  ) {
    this.forms = this.fb.group({
      idspmdetb : 0,
      idrek : ['', Validators.required],
      idspm : [0, Validators.required],
      nilai : 0,
      idunit: 0,
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookRekening(){
    this.Daftrek.title = 'Pilih Rekening';
    this.Daftrek._idunit = this.spmSelected.idunit;
    this.Daftrek._idxkode = this.spmSelected.idxkode,
    this.Daftrek._kdstatus = this.spmSelected.kdstatus,
    this.Daftrek._idbend = this.spmSelected.idbend
    this.Daftrek._idjnsakun = 6;
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
      } else if(this.mode === 'edit'){
        this.service.put(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              edited: true,
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
