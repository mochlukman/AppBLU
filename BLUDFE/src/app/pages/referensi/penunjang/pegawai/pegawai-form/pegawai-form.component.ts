import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { IGolongan } from 'src/app/core/interface/igolongan';
import { GolonganService } from 'src/app/core/services/golongan.service';
import { PegawaiService } from 'src/app/core/services/pegawai.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pegawai-form',
  templateUrl: './pegawai-form.component.html',
  styleUrls: ['./pegawai-form.component.scss']
})
export class PegawaiFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  golitems: SelectItem[] = [];
  golselected: IGolongan;
  initialForm: any;
  constructor(
    private service: PegawaiService,
    private fb: FormBuilder,
    private notif: NotifService,
    private golService: GolonganService
  ) {
    this.forms = this.fb.group({
      idpeg : 0,
      nip : ['', Validators.required],
      idunit : [0, [Validators.required, Validators.min(1)]],
      kdgol : ['', Validators.required],
      nama : '',
      alamat : '',
      jabatan : '',
      pddk :'',
      npwp : '',
      staktif : false,
      stvalid : false
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  getGolongan(){
    this.golitems = [];
    this.golService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          resp.forEach(x => {
            this.golitems.push({label: x.nmgol.trim() + ' - ' + x.pangkat, value:x.kdgol.trim()});
          });
          if(this.mode === 'edit'){
            this.golselected = this.golitems.find(w => w.value == this.forms.value.kdgol.trim()).value;
          }
        }
      },(error) => {
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
      });
  }
  changeGolongan(e: any){
    this.forms.patchValue({
      kdgol: e.value,
    });
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
    this.getGolongan();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.golitems = [];
    this.golselected = null;
  }
}
