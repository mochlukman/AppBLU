import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IJbkas } from 'src/app/core/interface/ijbkas';
import { ISts } from 'src/app/core/interface/ists';
import { indoKalender } from 'src/app/core/local';
import { BkuBudService } from 'src/app/core/services/bku-bud.service';
import { JbkasService } from 'src/app/core/services/jbkas.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookStsForBkuBudComponent } from 'src/app/shared/lookups/look-sts-for-bku-bud/look-sts-for-bku-bud.component';

@Component({
  selector: 'app-bku-bud-penerimaan-form',
  templateUrl: './bku-bud-penerimaan-form.component.html',
  styleUrls: ['./bku-bud-penerimaan-form.component.scss']
})
export class BkuBudPenerimaanFormComponent implements OnInit {
  showThis: boolean;
  loading_post: boolean;
  title: string;
  mode: string;
  forms: FormGroup;
  msg: Message[];
  indoKalender: any;
  initialForm: any;
  uiRef: IDisplayGlobal;
  refSelected: ISts;
  listjbkas: SelectItem[] = [];
  jbkasSelected: any;
  jenisBukti: string;
  @Output() callback = new EventEmitter();
  @ViewChild(LookStsForBkuBudComponent,{static: true}) ref: LookStsForBkuBudComponent;
  constructor(
    private service: BkuBudService,
    private notif: NotifService,
    private jbkasService: JbkasService,
    private fb: FormBuilder
  ) {
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idbku : 0,
      nobukas : ['', Validators.required],
      idkas : 0,
      idref : [0, [Validators.required, Validators.min(1)]],
      idbkas : [0, [Validators.required, Validators.min(1)]],
      idunit : '',
      idttd: 0,
      nobukti: '',
      nobbantu: '',
      uraian: '',
      tglkas : null,
      tglvalid : null,
      jenis : 'bkud'
    });
    this.initialForm = this.forms.value;
    this.uiRef = {kode: '', nama: ''};
  }
  ngOnInit() {
  }
  lookRef(){
    this.ref.title = 'Pilih STS';
    this.ref.showThis = true;
  }
  callbackRef(e: ISts){
    this.refSelected = e;
    this.uiRef = {kode: e.nosts, nama: e.uraian};
    if(this.refSelected){
      this.service.generateNoBku(this.refSelected.idbend).subscribe(resp => {
        if(resp.nobku){
          let nobukti = resp.nobku.split('-');
          nobukti = nobukti[0];
          this.forms.patchValue({
            nobukas: resp.nobku,
            nobukti:nobukti,
            idref: this.refSelected.idsts,
            idunit: this.refSelected.idunit
          });
        }
      });
    }
  }
  getJbkas(){
    this.listjbkas = [
      {label: 'Pilih', value: null}
    ];
    this.loading_post = true;
    this.jbkasService.gets()
      .subscribe(resp => {
        let temp: IJbkas[] = [];
        if(resp.length > 0 ){
          temp = resp;
          temp.forEach(e => {
            this.listjbkas.push({label: `${e.nmbkas}`, value: e.idbkas})
          });
        }
        if(this.mode === 'edit'){
          if(this.forms.value.kdstatus != null && this.forms.value.kdstatus != ''){
            this.jbkasSelected = this.listjbkas.find(w => w.value == this.forms.value.idbkas).value;
            if(temp.length > 0){
              let jbukti = temp.find(f => f.idbkas == this.forms.value.idbkas);
              if(jbukti != null){
                this.jenisBukti =  `${jbukti.nmbkas}`;
              }
            }

          }
        }
        this.loading_post = false;
      },(error) => {
        this.loading_post = false;
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
  changeJbkas(e: any){
    if(e.value){
      this.forms.patchValue({
        idbkas: e.value
      });
    }
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglkas: this.forms.value.tglkas !== null ? new Date(this.forms.value.tglkas).toLocaleDateString('en-US') : null,
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null,
      });
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
    } else {
      this.msg = [];
      this.msg.push({severity: 'error', summary: 'error', detail: 'Lengkapi Form'});
    }
  }
  onShow(){
    this.getJbkas();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.uiRef = {kode:'', nama:''};
    this.refSelected = null;
    this.msg = [];
  }
}
