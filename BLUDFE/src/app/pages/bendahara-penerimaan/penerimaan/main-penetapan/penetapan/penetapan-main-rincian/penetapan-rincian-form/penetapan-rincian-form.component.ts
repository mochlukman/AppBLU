import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDpad } from 'src/app/core/interface/idpad';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { TbpdetdService } from 'src/app/core/services/tbpdetd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDpadByTbpdetdComponent } from 'src/app/shared/lookups/look-dpad-by-tbpdetd/look-dpad-by-tbpdetd.component';

@Component({
  selector: 'app-penetapan-rincian-form',
  templateUrl: './penetapan-rincian-form.component.html',
  styleUrls: ['./penetapan-rincian-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class PenetapanRincianFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: IDpad[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookDpadByTbpdetdComponent, {static: true}) Dpad : LookDpadByTbpdetdComponent;
  @ViewChild('dt', {static:true}) dt: any;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: TbpdetdService
  ) {
    this.forms = this.fb.group({
      idtbpdetd : 0,
      idrek : ['', Validators.required],
      idtbp : [0, Validators.required],
      nilai : 0,
      idunit: 0,
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookDpar(){
    this.Dpad.title = 'Pilih Rekening';
    this.Dpad.gets({Idunit: this.forms.value.idunit, Idtbp: this.forms.value.idtbp});
    this.Dpad.showThis = true;
  }
  callbackDpad(e: IDpad[]){
    if(e){
      this.listdata = [];
      this.listdata = [...e];
      let temp_rek = this.listdata.map(m => m.idrek);
      let temp_nilai = this.listdata.map((m => m.nilai));
      this.forms.patchValue({
        idrek: temp_rek,
        nilai: temp_nilai
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
