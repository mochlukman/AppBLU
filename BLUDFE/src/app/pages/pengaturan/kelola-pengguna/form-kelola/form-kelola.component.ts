import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { WebUserService } from 'src/app/core/services/web-user.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-form-kelola',
  templateUrl: './form-kelola.component.html',
  styleUrls: ['./form-kelola.component.scss']
})
export class FormKelolaComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  msg: Message[];
  forms: FormGroup;
  setuju: boolean;
  tidak: boolean;
  @Output() callBack = new EventEmitter();
  @ViewChild('r1', {static:true}) r1: any;
  @ViewChild('r2', {static:true}) r2: any;
  constructor(
    private service: WebUserService,
    private fb: FormBuilder,
    private notif: NotifService,
    private cdr: ChangeDetectorRef
  ) {
    this.forms = this.fb.group({
      userid : ['', Validators.required],
      isauthorized: ['', Validators.required],
      nama : '',
      kelompok: '',
      otorisasi: ''
    });
  }
  ngOnInit(){
  }
  clickApprov(e: any){
    if(e.inputId == 'setuju'){
      this.forms.patchValue({
        isauthorized: true,
      });
    } else if(e.inputId == 'tidak'){
      this.forms.patchValue({
        isauthorized: false,
      });
    }
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.service.approval(this.forms.value).subscribe((resp) => {
        if (resp.ok) {
          this.callBack.emit({
            update: true,
            data: resp.body
          });
          this.onHide();
          this.notif.success('Data Berhasil Diupdate');
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
  onShow(){
    if(this.forms.value.isauthorized == true){
      this.r1.checked = true;
    } else if(this.forms.value.isauthorized == false){
      this.r2.checked = true;
    }
    this.cdr.detectChanges();
  }
  onHide(){
    this.forms.reset();
    this.forms.patchValue({
      userid : '',
      isauthorized: '',
      nama : '',
      kelompok: '',
      otorisasi: ''
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.r1.checked = false;
    this.r2.checked = false;
    this.setuju = false;
    this.tidak = false;
    this.cdr.detectChanges();
  }
}