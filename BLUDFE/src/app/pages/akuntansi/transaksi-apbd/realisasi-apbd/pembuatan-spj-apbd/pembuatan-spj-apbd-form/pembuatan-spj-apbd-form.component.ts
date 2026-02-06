import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Message, SelectItem} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { indoKalender } from 'src/app/core/local';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {StattrsService} from 'src/app/core/services/stattrs.service';
import {IStattrs} from 'src/app/core/interface/istattrs';
import {SpjapbdService} from 'src/app/core/services/spjapbd.service';

@Component({
  selector: 'app-pembuatan-spj-apbd-form',
  templateUrl: './pembuatan-spj-apbd-form.component.html',
  styleUrls: ['./pembuatan-spj-apbd-form.component.scss']
})
export class PembuatanSpjApbdFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  listStattrs: SelectItem[] = [];
  stattrsSelected: any;
  jenisBukti: string;
  initialForm: any;
  constructor(
    private service: SpjapbdService,
    private fb: FormBuilder,
    private notif: NotifService,
    private stattrsService: StattrsService
  ) {
    this.forms = this.fb.group({
      idspjapbd: 0,
      idunit: [0, [Validators.required, Validators.min(1)]],
      idkeg: [0, [Validators.required, Validators.min(1)]],
      nospj: ['', Validators.required],
      kdstatus: ['', Validators.required],
      tglspj: null,
      keterangan: ""
    });
    this.indoKalender = indoKalender;
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  getStattrs(){
    this.listStattrs = [
      {label: 'Pilih', value: null}
    ];
    this.stattrsService.getBylist('82')
      .subscribe(resp => {
        let tempjBukti: IStattrs[] = [];
        if(resp.length > 0 ){
          tempjBukti = resp;
          tempjBukti.forEach(e => {
            this.listStattrs.push({label: `${e.lblstatus}`, value: e.kdstatus})
          });
        }
        if(this.mode === 'edit'){
          if(this.forms.value.kdstatus != null && this.forms.value.kdstatus != ''){
            this.stattrsSelected = this.listStattrs.find(w => w.value == this.forms.value.kdstatus).value;
            if(tempjBukti.length > 0){
              let jbukti = tempjBukti.find(f => f.kdstatus.trim() == this.forms.value.kdstatus.trim());
              if(jbukti != null){
                this.jenisBukti =  `${jbukti.lblstatus}`;
              }
            }

          }
        }
      });
  }
  changeStattrs(e: any){
    if(e.value){
      let label = this.listStattrs.find(f => f.value == e.value);
      let label_split = label.label.split(':');
      this.forms.patchValue({
        kdstatus:  e.value,
      });
    } else {
      this.forms.patchValue({
        kdstatus: '',
      });
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Status'});
    }
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglspj: this.forms.value.tglspj !== null ? new Date(this.forms.value.tglspj).toLocaleDateString('en-US') : null
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
    this.getStattrs();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
