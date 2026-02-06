import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { IStruunit } from 'src/app/core/interface/istruunit';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { DafturusService } from 'src/app/core/services/dafturus.service';
import { StruunitService } from 'src/app/core/services/struunit.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-units-form',
  templateUrl: './units-form.component.html',
  styleUrls: ['./units-form.component.scss']
})
export class UnitsFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  initialForm: any;
  listStruktur: SelectItem[] = [];
  struunitSelected: any;
  listUrus: SelectItem[] = [];
  urusSelected: any;
  constructor(
    private service: DaftunitService,
    private fb: FormBuilder,
    private notif: NotifService,
    private struunitService: StruunitService,
    private urusService: DafturusService
  ) {
    this.forms = this.fb.group({
      idunit : 0,
      idpemda : 0,
      idurus : 0,
      kdunit : ['', Validators.required],
      nmunit : ['', Validators.required],
      kdlevel : [0, Validators.required],
      type : ['', Validators.required],
      akrounit : '',
      alamat : '',
      telepon : '',
      staktif : 1
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
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
  getUrus(){
    this.loading_post = true;
    this.listStruktur = []
    this.urusService._kdlevel = '2';
    this.urusService.gets().subscribe(resp => {
      if(resp.length > 0){
        resp.forEach(x => {
          this.listUrus.push({label: x.nmurus.trim() , value:x.idurus});
        });
        if(this.mode === 'edit' || this.mode == 'addsub'){
          this.urusSelected = this.listUrus.find(w => w.value == this.forms.value.idurus).value;
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
  changeUrus(e: any){
    this.forms.patchValue({
      idurus: e.value
    });
  }
  getStruunit(){
    this.loading_post = true;
    this.listStruktur = []
    this.struunitService.get().subscribe(resp => {
      if(resp.length > 0){
        resp.forEach(x => {
          this.listStruktur.push({label: x.nmlevel.trim() , value:x.kdlevel});
        });
        if(this.mode === 'edit'){
          this.struunitSelected = this.listStruktur.find(w => w.value == this.forms.value.kdlevel).value;
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
  changeStruunit(e: any){
    this.forms.patchValue({
      kdlevel: e.value
    });
  }
  onShow(){
    this.getUrus();
    this.getStruunit();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.listStruktur = [];
    this.struunitSelected = null;
    this.listUrus = [];
    this.urusSelected = null;
  }
}
