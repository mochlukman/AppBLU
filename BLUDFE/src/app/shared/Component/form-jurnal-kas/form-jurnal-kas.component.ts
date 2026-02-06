import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { indoKalender } from 'src/app/core/local';
import { BkuPenerimaanService } from 'src/app/core/services/bku-penerimaan.service';
import { JurnalKasService } from 'src/app/core/services/jurnal-kas.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-form-jurnal-kas',
  templateUrl: './form-jurnal-kas.component.html',
  styleUrls: ['./form-jurnal-kas.component.scss']
})
export class FormJurnalKasComponent implements OnInit {
  showThis: boolean;
  loading_post: boolean;
  title: string;
  mode: string;
  forms: FormGroup;
  msg: Message[];
  indoKalender: any;
  initialForm: any;
  uiRef: IDisplayGlobal;
  refSelected: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: JurnalKasService,
    private notif: NotifService,
    private fb: FormBuilder
  ) {
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idbku : 0,
      nobku : ['', Validators.required],
      idunit : [0, [Validators.required, Validators.min(1)]],
      tglbku : {value: null, disabled: true},
      nobukti: '',
      idref : 0,
      uraian : [''],
      tglvalidbku: [null, Validators.required],
      idbend : [0, [Validators.required, Validators.min(1)]],
      jenis : ['', Validators.required]
    });
    this.initialForm = this.forms.value;
    this.uiRef = {kode: '', nama: ''};
  }
  ngOnInit() {
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglvalidbku: this.forms.value.tglvalidbku !== null ? new Date(this.forms.value.tglvalidbku).toLocaleDateString('en-US') : null
      });
      if(this.mode === 'edit'){
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
  onShow(){}
  onHide(){
    this.uiRef = {kode: '', nama: ''};
    this.forms.reset(this.initialForm);
    this.showThis = false;
  }
}
