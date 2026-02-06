import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { DafturusService } from 'src/app/core/services/dafturus.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-urusan-form',
  templateUrl: './urusan-form.component.html',
  styleUrls: ['./urusan-form.component.scss']
})
export class UrusanFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  initialForm: any;
  constructor(
    private service: DafturusService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.forms = this.fb.group({
      idurus : 0,
      kdurus : ['', Validators.required],
      nmurus : ['', Validators.required],
      kdlevel : [0, [Validators.required, Validators.min(1)]],
      type : ['', Validators.required],
      akrounit : '',
      alamat : '',
      telepon : '',
      staktif : 0
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      if(this.mode === 'edit'){
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
