import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { DaftrekeningService } from 'src/app/core/services/daftrekening.service';
import { JnsakunService } from 'src/app/core/services/jnsakun.service';
import { JrekService } from 'src/app/core/services/jrek.service';
import { StrurekService } from 'src/app/core/services/strurek.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-akun-pendapatan-form',
  templateUrl: './akun-pendapatan-form.component.html',
  styleUrls: ['./akun-pendapatan-form.component.scss']
})
export class AkunPendapatanFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  initialForm: any;
  listStrurek: SelectItem[] = [];
  strurekSelected: any;
  listJnsakun: SelectItem[] = [];
  jnsakunkSelected: any;
  listJrek: SelectItem[] = [];
  jrekSelected: any;
  constructor(
    private service: DaftrekeningService,
    private fb: FormBuilder,
    private notif: NotifService,
    private strurekService: StrurekService,
    private jnsakunService: JnsakunService,
    private jrekService: JrekService
  ) {
    this.forms = this.fb.group({
      idrek: 0,
      kdper: ['', Validators.required],
      nmper: ['', Validators.required],
      mtglevel: [0, [Validators.required, Validators.min(1)]],
      kdkhusus: 1,
      jnsrek: [0, [Validators.required, Validators.min(1)]],
      idjnsakun: 0,
      type: ['', Validators.required],
      staktif: 1
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  getStrurek(){
    this.loading_post = true;
    this.listStrurek = []
    this.strurekService.gets().subscribe(resp => {
      if(resp.length > 0){
        resp.forEach(x => {
          this.listStrurek.push({label: x.nmlevel.trim() , value:x.mtglevel});
        });
        if(this.mode === 'edit' || this.mode == 'addsub'){
          if(this.forms.value.jnskeg != 0){
            this.strurekSelected = this.listStrurek.find(w => w.value == this.forms.value.mtglevel).value;
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
  changeStrurek(e: any){
    this.forms.patchValue({
      mtglevel: e.value
    });
  }
  getJnsakun(){
    this.loading_post = true;
    this.listJnsakun = []
    this.jnsakunService._idjnsakun = '4,5,6';
    this.jnsakunService.getByListId().subscribe(resp => {
      if(resp.length > 0){
        resp.forEach(x => {
          this.listJnsakun.push({label: x.uraiakun.trim() , value:x.idjnsakun});
        });
        if(this.mode === 'edit' || this.mode == 'addsub'){
          if(this.forms.value.idjnsakun != 0){
            this.jnsakunkSelected = this.listJnsakun.find(w => w.value == this.forms.value.idjnsakun).value;
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
  changeJnsakun(e: any){
    this.forms.patchValue({
      idjnsakun: e.value
    });
  }
  getJrek(){
    this.loading_post = true;
    this.listJrek = []
    this.jrekService.gets().subscribe(resp => {
      if(resp.length > 0){
        resp.forEach(x => {
          this.listJrek.push({label: x.uraian.trim() , value:x.jnsrek});
        });
        if(this.mode === 'edit' || this.mode == 'addsub'){
          if(this.forms.value.jnsrek != 0){
            this.jrekSelected = this.listJrek.find(w => w.value == this.forms.value.jnsrek).value;
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
  changeJrek(e: any){
    this.forms.patchValue({
      jnsrek: e.value
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
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
    this.getStrurek();
    this.getJnsakun();
    this.getJrek();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.listStrurek = [];
    this.strurekSelected = null;
    this.listJnsakun = [];
    this.jnsakunkSelected = null;
    this.listJrek = [];
    this.jrekSelected = null;
  }
}
