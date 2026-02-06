import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { JkegService } from 'src/app/core/services/jkeg.service';
import { MkegiatanService } from 'src/app/core/services/mkegiatan.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-kegiatan-form',
  templateUrl: './kegiatan-form.component.html',
  styleUrls: ['./kegiatan-form.component.scss']
})
export class KegiatanFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  initialForm: any;
  listJJkeg: SelectItem[] = [];
  jkegSelected: any;
  constructor(
    private service: MkegiatanService,
    private fb: FormBuilder,
    private notif: NotifService,
    private jkegService: JkegService
  ) {
    this.forms = this.fb.group({
      idkeg : 0,
      idprgrm : [0, [Validators.required, Validators.min(1)]],
      nukeg : ['', Validators.required],
      nmkegunit : ['', Validators.required],
      levelkeg : 1,
      type : [{value: '', disabled: true}, Validators.required],
      idkeginduk : 0,
      staktif : true,
      stvalid : false,
      jnskeg : 0
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  typeChange(e: any){
    this.forms.patchValue({
      levelkeg : this.forms.value.type == 'H' ? 1 : 2
    });
  }
  getJkeg(){
    this.loading_post = true;
    this.listJJkeg = []
    this.jkegService.gets().subscribe(resp => {
      if(resp.length > 0){
        resp.forEach(x => {
          this.listJJkeg.push({label: x.uraian.trim() , value:x.jnskeg});
        });
        if(this.mode === 'edit'){
          if(this.forms.value.jnskeg != 0){
            this.jkegSelected = this.listJJkeg.find(w => w.value == this.forms.value.jnskeg).value;
          }
        }
      }
      this.loading_post = false;
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
      this.loading_post = false;
    });
  }
  changeJkeg(e: any){
    this.forms.patchValue({
      jnskeg: e.value
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.controls['type'].enable();
      if(this.mode == 'add' || this.mode == 'addsub'){
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
    this.getJkeg();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.forms.controls['type'].disable();
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.listJJkeg = [];
    this.jkegSelected = null;
  }
}