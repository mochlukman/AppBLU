import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { indoKalender } from 'src/app/core/local';
import { TahapService } from 'src/app/core/services/tahap.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-form-jadwal-tukd',
  templateUrl: './form-jadwal-tukd.component.html',
  styleUrls: ['./form-jadwal-tukd.component.scss']
})
export class FormJadwalTukdComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  constructor(
    private service: TahapService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      kdtahap : ['', Validators.required],
      uraian : ['', Validators.required],
      nmtahap : '',
      startDate : null,
      endDate : null,
      tgltransfer : null,
      ket : '',
    });
  }
  ngOnInit(){
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        startDate: this.forms.value.startDate !== null ? new Date(this.forms.value.startDate).toLocaleDateString('en-US') : null,
        endDate: this.forms.value.endDate !== null ? new Date(this.forms.value.endDate).toLocaleDateString('en-US') : null,
        tgltransfer: this.forms.value.tgltransfer !== null ? new Date(this.forms.value.tgltransfer).toLocaleDateString('en-US') : null,
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
  }
  onHide(){
    this.forms.reset();
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
