import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IJnsakun } from 'src/app/core/interface/ijnsakun';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { IfService } from 'src/app/core/services/if.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDpakegiatanComponent } from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import {LookDafrekByJnsakunComponent} from 'src/app/shared/lookups/look-dafrek-by-jnsakun/look-dafrek-by-jnsakun.component';
import { LookupRekByJnsakunComponent } from 'src/app/shared/lookups/lookup-rek-by-jnsakun/lookup-rek-by-jnsakun.component';

@Component({
  selector: 'app-bukti-memorial-rincian-form',
  templateUrl: './bukti-memorial-rincian-form.component.html',
  styleUrls: ['./bukti-memorial-rincian-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class BuktiMemorialRincianFormComponent implements OnInit {
  showthis: boolean;
  loadingpost: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  userInfo: ITokenClaim;
  idjenisakun: string;
  getjenisakun: boolean;
  jenisakun: string;
  jnsakunselected: IJnsakun;
  @Output() callback = new EventEmitter();
  @ViewChild(LookDpakegiatanComponent,{static: true}) Kegiatan : LookDpakegiatanComponent;
  /*@ViewChild(LookupRekByJnsakunComponent,{static: true}) Rekening : LookupRekByJnsakunComponent;*/
  @ViewChild(LookDafrekByJnsakunComponent,{static: true}) Rekening : LookDafrekByJnsakunComponent;
  uiKeg: IDisplayGlobal;
  kegselected: any;
  uiRek: IDisplayGlobal;
  rekSelected: IDaftrekening;
  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private service: IfService,
    private notif: NotifService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.forms = this.fb.group({
      idbmdet : 0,
      idbm : [0, [Validators.required, Validators.min(1)]],
      idrek : [0, [Validators.required, Validators.min(1)]],
      kdpers : ['', Validators.required],
      idkeg: 0,
      nilai: 0,
      idunit: [0, [Validators.required, Validators.min(1)]],
      idjnsakun: [0, [Validators.required, Validators.min(1)]],
      tname: ''
    });
    this.initialForm = this.forms.value;
    this.uiKeg = {kode: '', nama: ''};
    this.uiRek = {kode: '', nama: ''};
  }

  ngOnInit() {
  }
  callbackJenisAkun(data: IJnsakun){
    if(data){
      this.jnsakunselected = data;
      this.forms.patchValue({
        idjnsakun: this.jnsakunselected.idjnsakun
      });
    } else {
      this.jnsakunselected = null;
      this.forms.patchValue({
        idjnsakun: 0
      });
    }
    this.rekSelected = null;
    this.uiRek = {kode: '', nama : ''};
    this.forms.patchValue({
      idrek : 0
    });
  }
  lookupKegiatan(){
    this.Kegiatan.title = 'Pilih Sub Kegiatan';
    this.Kegiatan.get(this.forms.value.idunit, '321'); //parameter ke 4 = jnskeg, Non Pegawai SKPD
    this.Kegiatan.showThis = true;
  }
  callbackKegiatan(data: any){
    if(data){
      this.kegselected = data;
      this.forms.patchValue({
        idkeg: this.kegselected.data_id
      });
      let label = this.kegselected.label.split("-");
      this.uiKeg = {kode: label[0].trim(), nama: label[1].trim()};
    }
  }
  lookupRekening(){
    if(this.jnsakunselected){
      this.Rekening.title = 'Pilih Rekening';
      this.Rekening.params = {Idjnsakun: this.jnsakunselected.idjnsakun.toString(), Type: 'D'};
      this.Rekening.showThis = true;
    } else {
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Jenis Rekening'});
    }
  }
  /*lookupRekening(){
    if(this.jnsakunselected){
      this.Rekening.title = "Pilih Rekening";
      this.Rekening.gets(this.jnsakunselected.idjnsakun.toString());
      this.Rekening.showThis = true;
    } else {
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Jenis Rekening'});
    }
  }*/
  /*callbackRekening(data: IDaftrekening){
    if(data){
      this.rekSelected = data;
      this.uiRek = {kode: this.rekSelected.kdper.trim(), nama : this.rekSelected.nmper.trim()};
      this.forms.patchValue({
        idrek : this.rekSelected.idrek
      });
    }
  }*/

  callbackRekening(e: IDaftrekening){
    this.rekSelected = e;
    this.uiRek = {kode: e.kdper, nama: e.nmper};
    this.forms.patchValue({
      idrek: this.rekSelected.idrek
    });
  }

  simpan(){
    if(this.forms.valid){
      this.loadingpost = true;
      if(this.mode === 'add'){
        this.service.post('Bktmemdet', this.forms.value).subscribe((resp) => {
          this.callback.emit({
            added: true,
            data: resp
          });
          this.onHide();
          this.notif.success('Data Berhasil Diinput');
          this.loadingpost = false;
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
          this.loadingpost = false;
        });
      } else if(this.mode === 'edit'){
        this.service.put('Bktmemdet', this.forms.value).subscribe((resp) => {
          this.callback.emit({
            edited: true,
            data: resp
          });
          this.onHide();
          this.notif.success('Nilai Berhasil Diubah');
          this.loadingpost = false;
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
          this.loadingpost = false;
        });
      }
    }
  }
  onShow(){
    if(this.mode == 'add'){
      this.getjenisakun = true;
    }
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showthis = false;
    this.getjenisakun = false;
    this.jnsakunselected = null;
    this.uiRek = {kode: '', nama: ''};
    this.uiKeg = {kode: '', nama: ''};
    this.rekSelected = null;
    this.kegselected = null;
  }
}
