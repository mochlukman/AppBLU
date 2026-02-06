import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Message} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TahapService} from 'src/app/core/services/tahap.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-tahapan-form',
  templateUrl: './tahapan-form.component.html',
  styleUrls: ['./tahapan-form.component.scss']
})
export class TahapanFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  @Output() callBack = new EventEmitter();
  listJenis = [
    {label: 'Pilih Jenis', value: null, checked: false},
    {label: 'Murni', value: 'Murni'},
    {label: 'Pergeseran', value: 'Pergeseran'},
    {label: 'Perubahan', value: 'Perubahan'},
  ]
  constructor(
    private service: TahapService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      kdtahap : ['', Validators.required],
      uraian : ['', Validators.required],
      nmtahap : ['', Validators.required],
      ket : '',
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  onChangeTahap(e: any){
    let ket = e ? `RBA ${e}` : '';
    this.forms.patchValue({ket: ket});
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
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
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
