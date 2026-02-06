import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { indoKalender } from 'src/app/core/local';
import { JurnalKonsolidatorService } from 'src/app/core/services/jurnal-konsolidator.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-form-jurnal-konsolidator',
  templateUrl: './form-jurnal-konsolidator.component.html',
  styleUrls: ['./form-jurnal-konsolidator.component.scss']
})
export class FormJurnalKonsolidatorComponent implements OnInit {
  showThis: boolean;
  loading_post: boolean;
  title: string;
  titleRef: string;
  mode: string;
  forms: FormGroup;
  msg: Message[];
  indoKalender: any;
  initialForm: any;
  uiRef: IDisplayGlobal;
  refSelected: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: JurnalKonsolidatorService,
    private notif: NotifService,
    private fb: FormBuilder
  ) {
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idbku : [0, [Validators.required, Validators.min(1)]],
      nobkukas : '',
      tglkas : {value: null, disabled: true},
      nobukti: '',
      nmbukti: '',
      idref : 0,
      uraian : [''],
      tglvalid: [null, Validators.required],
      jenis : '',
      valid: null
    });
    this.initialForm = this.forms.value;
    this.uiRef = {kode: '', nama: ''};
  }
  ngOnInit() {
  }
  changeValid(e: any){
    if(e.checked){
      this.forms.controls['tglvalid'].enable();
    } else {
      this.forms.patchValue({
        tglvalid: null
      });
      this.forms.controls['tglvalid'].disable();
    }
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.controls['tglvalid'].enable();
      this.forms.patchValue({
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
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
  onShow(){
    if(this.forms.controls['valid'].value == true){
      this.forms.controls['tglvalid'].enable();
    } else {
      this.forms.controls['tglvalid'].disable();
    }
  }
  onHide(){
    this.uiRef = {kode: '', nama: ''};
    this.forms.reset(this.initialForm);
    this.showThis = false;
  }
}
