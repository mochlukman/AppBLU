import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Message} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {DaftbankService} from 'src/app/core/services/daftbank.service';

@Component({
  selector: 'app-daftar-bank-form',
  templateUrl: './daftar-bank-form.component.html',
  styleUrls: ['./daftar-bank-form.component.scss']
})
export class DaftarBankFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: DaftbankService
  ) {
    this.forms = this.fb.group({
      idbank: 0,
      kdbank: ["", Validators.required],
      akbank: ["", Validators.required],
      alamat: "",
      telepon: "",
      cabang: ""

    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
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
            this.callback.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Ubah Data Berhasil');
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
  }
}
