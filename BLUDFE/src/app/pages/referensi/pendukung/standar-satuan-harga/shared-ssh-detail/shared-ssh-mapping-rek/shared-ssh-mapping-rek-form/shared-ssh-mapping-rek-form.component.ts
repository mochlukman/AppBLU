import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { SshrekService } from 'src/app/core/services/sshrek.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftrekBykodeComponent } from 'src/app/shared/lookups/look-daftrek-bykode/look-daftrek-bykode.component';

@Component({
  selector: 'app-shared-ssh-mapping-rek-form',
  templateUrl: './shared-ssh-mapping-rek-form.component.html',
  styleUrls: ['./shared-ssh-mapping-rek-form.component.scss']
})
export class SharedSshMappingRekFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  msg: Message[];
  forms: FormGroup;
  listdata: any[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookDaftrekBykodeComponent, {static: true}) FormRekening : LookDaftrekBykodeComponent;
  @ViewChild('dt', {static:true}) dt: any;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: SshrekService
  ) {
    this.forms = this.fb.group({
      idsshrek : 0,
      idrek : ['', Validators.required],
      idssh : [0, Validators.required],
      kdssh : ''
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookRekening(){
    this.msg = [];
    this.FormRekening.title = 'Pilih Rekening';
    this.FormRekening.kode = '5.';
    this.FormRekening.showThis = true;
  }
  callbackRekening(e: any){
    this.msg = [];
    if(e){
      let check = this.listdata.findIndex(f => f.idrek == e.idrek);
      if(check < 0){
        this.listdata.push(e);
        let temp_rek = this.listdata.map(m => m.idrek);
        this.forms.patchValue({
          idrek: temp_rek
        });
      } else {
        this.msg.push({severity: 'info', summary: 'infor', detail: 'Rekening Sudah Ditambahkan'});
      }
      
    }
  }
  HapusRek(e: any){
    this.listdata = this.listdata.filter(f => f.idrek !== e.idrek);
    let temp_rek = this.listdata.map(m => m.idrek);
      this.forms.patchValue({
        idrek: temp_rek
      });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
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
