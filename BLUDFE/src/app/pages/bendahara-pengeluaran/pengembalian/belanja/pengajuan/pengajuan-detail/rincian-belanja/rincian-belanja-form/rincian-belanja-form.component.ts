import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { StsdetrService } from 'src/app/core/services/stsdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftrekForStsdetrComponent } from 'src/app/shared/lookups/look-daftrek-for-stsdetr/look-daftrek-for-stsdetr.component';
import { LookDpakegiatanComponent } from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';

@Component({
  selector: 'app-rincian-belanja-form',
  templateUrl: './rincian-belanja-form.component.html',
  styleUrls: ['./rincian-belanja-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class RincianBelanjaFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  msg: Message[];
  mode: string;
  forms: FormGroup;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  uiRek: IDisplayGlobal;
  rekSelected: any;
  @Output() callback = new EventEmitter();
  initialForm: any;
  @ViewChild(LookDpakegiatanComponent, { static: true }) Kegiatan: LookDpakegiatanComponent;
  @ViewChild(LookDaftrekForStsdetrComponent, {static: true}) Rekening : LookDaftrekForStsdetrComponent;
  stsSelected: any;
  constructor(
    private fb: FormBuilder,
    private service: StsdetrService,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idstsdetr: 0,
      idsts: [0, [Validators.required, Validators.min(1)]],
      idkeg: [0, [Validators.required, Validators.min(1)]],
      idrek: [0, [Validators.required, Validators.min(1)]],
      idnojetra: 12,
      nilai: 0
    });
    this.initialForm = this.forms.value;
    this.uiKeg = {kode: '', nama: ''};
    this.uiRek = {kode: '', nama: ''};
  }
  ngOnInit(){
  }
  lookKegiatan(){
    this.Kegiatan.title = 'Pilih Sub Kegiatan';
    this.Kegiatan.get(this.stsSelected.idunit, '321', false, 2); //parameter ke 4 = jnskeg, Non Pegawai SKPD
    this.Kegiatan.showThis = true;
  }
  callBackKegiatan(e: ILookupTree){
    this.kegSelected = e;
    let split_label = this.kegSelected.label.split('-');
    this.uiKeg = {kode: split_label[0], nama: split_label[1]};
    this.forms.patchValue({
      idkeg: this.kegSelected.data_id
    });
  }
  lookRekening(){
    this.Rekening._idunit = this.stsSelected.idunit;
    this.Rekening._idbend = this.stsSelected.idbend;
    this.Rekening._idxkode = this.stsSelected.idxkode;
    this.Rekening._kdstatus = this.stsSelected.kdstatus;
    this.Rekening._idkeg = this.kegSelected.data_id;
    this.Rekening._kdperStartwith = '5.';
    this.Rekening._mtglevel = '6';
    this.Rekening.title = 'Pilih Rekening Belanja';
    this.Rekening.showThis = true;
  }
  callbackRekening(e: any){
    this.rekSelected = e;
    this.forms.patchValue({
      idrek: this.rekSelected.idrek
    });
    this.uiRek = {kode: this.rekSelected.kdper, nama: this.rekSelected.nmper};
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      if(this.mode == 'add'){
        this.service.post(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              added: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Data Berhasil Di Ubah');
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
      } else {
        this.service.put(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Data Berhasil Di Ubah');
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
    this.uiKeg = {kode: '', nama: ''};
    this.uiRek = {kode: '', nama: ''};
    this.kegSelected = null;
    this.rekSelected = null;
  }
}
