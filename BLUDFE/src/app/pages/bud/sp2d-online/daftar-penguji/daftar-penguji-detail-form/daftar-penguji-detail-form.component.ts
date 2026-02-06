import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { DpdetService } from 'src/app/core/services/dpdet.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookSp2dForDpdetCheckboxComponent } from 'src/app/shared/lookups/look-sp2d-for-dpdet-checkbox/look-sp2d-for-dpdet-checkbox.component';

@Component({
  selector: 'app-daftar-penguji-detail-form',
  templateUrl: './daftar-penguji-detail-form.component.html',
  styleUrls: ['./daftar-penguji-detail-form.component.scss']
})
export class DaftarPengujiDetailFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: ISp2d[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookSp2dForDpdetCheckboxComponent, {static: true}) sp2d : LookSp2dForDpdetCheckboxComponent;
  @ViewChild('dt', {static:true}) dt: any;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: DpdetService,
  ) {
    this.forms = this.fb.group({
      iddpdet: 0,
      idxkode: [0, Validators.required],
      iddp: [0, Validators.required],
      idsp2d: ''
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookSP2D(){
    this.sp2d.title = 'Pilih SP2D';
    this.sp2d._iddp = this.forms.value.iddp;
    this.sp2d._idxkode = this.forms.value.idxkode;
    this.sp2d.showThis = true;
  }
  callbackSP2D(e: ISp2d[]){
    if(e){
      this.listdata = [];
      this.listdata = [...e];
      let temp_data = this.listdata.map(m => m.idsp2d);
      this.forms.patchValue({
        idsp2d: temp_data
      });
    }
  }
  HapusSP2D(e: ISp2d){
    this.listdata = this.listdata.filter(f => f.idsp2d !== e.idsp2d);
    let temp_data = this.listdata.map(m => m.idsp2d);
      this.forms.patchValue({
        idsp2d: temp_data
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
