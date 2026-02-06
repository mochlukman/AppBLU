import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftrekByspddetrComponent } from 'src/app/shared/lookups/look-daftrek-byspddetr/look-daftrek-byspddetr.component';

@Component({
  selector: 'app-form-spp-detail-ls-pegawai',
  templateUrl: './form-spp-detail-ls-pegawai.component.html',
  styleUrls: ['./form-spp-detail-ls-pegawai.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormSppDetailLsPegawaiComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: IDaftrekening[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookDaftrekByspddetrComponent, {static: true}) Rekening : LookDaftrekByspddetrComponent;
  listRekExist: number[] = [];
  @ViewChild('dt', {static:true}) dt: any;
  isvalid: boolean = false;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: SppdetrService
  ) {
    this.forms = this.fb.group({
      idsppdetr : 0,
      idrek : ['', Validators.required],
      idkeg : [0, Validators.required],
      idspp : [0, Validators.required],
      nilai : 0,
      idspd: 0,
      idunit: 0
    });
  }
  ngOnInit(){
  }
  lookRekening(){
    this.Rekening.title = 'Pilih Rekening';
    this.Rekening.gets(this.forms.value.idspd);
    this.Rekening.listRekExist = this.listRekExist;
    this.Rekening.showThis = true;
  }
  callbackRekening(e: IDaftrekening[]){
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
        this.service.putNilai(this.forms.value).subscribe((resp) => {
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
    this.forms.reset();
    this.forms.patchValue({
      idsppdetr : 0,
      idrek : '',
      idkeg : 0,
      idspp : 0,
      nilai : 0,
      idspd: 0,
      idunit: 0
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.listdata = [];
    this.listRekExist = [];
    this.isvalid = false;
  }
}
