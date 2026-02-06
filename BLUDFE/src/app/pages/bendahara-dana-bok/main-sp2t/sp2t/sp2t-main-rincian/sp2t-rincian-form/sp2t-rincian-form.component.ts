import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IDpad} from 'src/app/core/interface/idpad';
import {LookDpadBySkpdetComponent} from 'src/app/shared/lookups/look-dpad-by-skpdet/look-dpad-by-skpdet.component';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {SkpdetService} from 'src/app/core/services/skpdet.service';
import {InputRupiahPipe} from 'src/app/core/pipe/input-rupiah.pipe';

@Component({
  selector: 'app-sp2t-rincian-form',
  templateUrl: './sp2t-rincian-form.component.html',
  styleUrls: ['./sp2t-rincian-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class Sp2tRincianFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: IDpad[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookDpadBySkpdetComponent, {static: true}) Dpad : LookDpadBySkpdetComponent;
  @ViewChild('dt', {static:true}) dt: any;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: SkpdetService
  ) {
    this.forms = this.fb.group({
      idskpdet : 0,
      idrek : ['', Validators.required],
      idskp : [0, Validators.required],
      nilai : 0,
      idunit: 0,
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookDpar(){
    this.Dpad.title = 'Pilih Rekening';
    this.Dpad.gets(this.forms.value.idunit, this.forms.value.idskp);
    this.Dpad.showThis = true;
  }
  callbackDpad(e: IDpad[]){
    if(e){
      this.listdata = [];
      this.listdata = [...e];
      let temp_rek = this.listdata.map(m => m.idrek);
      this.forms.patchValue({
        idrek: temp_rek
      });
    }
  }
  HapusRek(e: IDpad){
    this.listdata = this.listdata.filter(f => f.idrek !== e.idrek);
    let temp_rek = this.listdata.map(m => m.idrek);
    this.forms.patchValue({
      idrek: temp_rek
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      if(this.mode === 'add'){
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
    this.listdata = [];
  }
}
