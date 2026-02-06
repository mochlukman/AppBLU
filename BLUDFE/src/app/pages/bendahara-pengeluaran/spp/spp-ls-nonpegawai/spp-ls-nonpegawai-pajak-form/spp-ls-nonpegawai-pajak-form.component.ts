import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IPajak } from 'src/app/core/interface/ipajak';
import { indoKalender } from 'src/app/core/local';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { SppdetrpService } from 'src/app/core/services/sppdetrp.service';
import { LookPajakComponent } from 'src/app/shared/lookups/look-pajak/look-pajak.component';

@Component({
  selector: 'app-spp-ls-nonpegawai-pajak-form',
  templateUrl: './spp-ls-nonpegawai-pajak-form.component.html',
  styleUrls: ['./spp-ls-nonpegawai-pajak-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class SppLsNonpegawaiPajakFormComponent implements OnInit {
  loading_post: boolean;
  uiPajak: IDisplayGlobal;
  pajakSelected: IPajak;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  indoKalender: any;
  @ViewChild(LookPajakComponent,{static: true}) Pajak : LookPajakComponent;
  isvalid: boolean = false;
  initialForm: any;
  constructor(
    private service: SppdetrpService,
    private fb: FormBuilder,
  ) {
    this.uiPajak = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idsppdetrp :  0,
      idsppdetr :  [0, [Validators.required, Validators.min(1)]],
      idpajak :  [0, [Validators.required, Validators.min(1)]],
      nilai :  0,
      keterangan :  '',
      idbilling :  '',
      tglbilling :  null,
      ntpn :  '',
      ntb :  '',
    });
    this.indoKalender = indoKalender;
    this.initialForm = this.forms.value;
  }

  ngOnInit(){
  }
  lookPajak(){
    this.Pajak.title = 'Pilih Pajak';
    this.Pajak._idsppdetr = this.forms.value.idsppdetr;
    this.Pajak.gets();
    this.Pajak.showThis = true;
  }
  callbackPajak(e: IPajak){
    this.pajakSelected = e;
    this.uiPajak = {kode: e.kdpajak, nama: e.nmpajak};
    this.forms.patchValue({
      idpajak: this.pajakSelected.idpajak
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.controls['tglbilling'].enable();
      this.forms.patchValue({
        tglbilling: this.forms.value.tglbilling !== null ? new Date(this.forms.value.tglbilling).toLocaleDateString('en-US') : null
      });
      if(this.mode === 'add'){
        this.service.post(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              added: true,
              data: resp.body
            });
            this.onHide();
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
        this.loading_post = false;
        this.msg = [];
        this.msg.push({severity: 'error', summary: 'error', detail: 'Mode Form Tidak Diketahui'});
      }
    }
  }
  onShow(){
    if(this.isvalid){
      this.forms.controls['tglbilling'].disable();
    } else {
      this.forms.controls['tglbilling'].enable();
    }
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.forms.controls['tglbilling'].disable();
    this.showThis = false;
    this.msg = [];
    this.uiPajak = {kode: '', nama: ''};
    this.pajakSelected = null;
    this.loading_post = false;
    this.isvalid = false;
  }
}
