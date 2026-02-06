import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal, ILookupTree2 } from 'src/app/core/interface/iglobal';
import { PgrmunitService } from 'src/app/core/services/pgrmunit.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookMpgrmTreeComponent } from 'src/app/shared/lookups/look-mpgrm-tree/look-mpgrm-tree.component';

@Component({
  selector: 'app-prog-unit-formx',
  templateUrl: './prog-unit-formx.component.html',
  styleUrls: ['./prog-unit-formx.component.scss']
})
export class ProgUnitFormxComponent implements OnInit {
  private Idurus: number;
  set _idurus(e: number){
    this.Idurus = e;
  }
  loading_post: boolean;
  uiMpgrm: IDisplayGlobal;
  mpgrmSelected: ILookupTree2;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  @Output() callBack = new EventEmitter();
  @ViewChild(LookMpgrmTreeComponent, {static: true}) Mpgrm : LookMpgrmTreeComponent;
  constructor(
    private service: PgrmunitService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idpgrmunit : 0,
      idunit : [0, [Validators.required, Validators.min(1)]],
      kdtahap : ['341', Validators.required],
      idprgrm : [0, [Validators.required, Validators.min(1)]],
      target : '',
      targetx : '',
      sasaran : '-',
      indikator : '',
      tglvalid: null,
    });
    this.initialForm = this.forms.value;
    this.uiMpgrm = {kode: '', nama: ''};
  }
  get targetx(){
    return this.forms.get('targetx').value;
  }
  ngOnInit(){
  }
  lookMpgrm(){
    this.Mpgrm.title = 'Pilih Program';
    this.Mpgrm._idurus = this.Idurus;
    this.Mpgrm.showThis = true;
  }
  callbackMpgrm(e: any){
    this.mpgrmSelected = e;
    this.uiMpgrm = {kode: this.mpgrmSelected.data_kode, nama: this.mpgrmSelected.data_nama};
    this.forms.patchValue({
      idprgrm: this.mpgrmSelected.data_id
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
      });
      if(this.mode === 'add'){
        this.service.post(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callBack.emit({
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
            this.callBack.emit({
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
    console.log(this.targetx);
  }
  onHide(){
    this.uiMpgrm = {kode: '', nama: ''};
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.mpgrmSelected = null;
  }
}
