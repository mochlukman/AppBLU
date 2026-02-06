import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IDaftrekening} from 'src/app/core/interface/idaftrekening';
import {Message} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {LookRekArusKasComponent} from 'src/app/shared/lookups/look-rek-arus-kas/look-rek-arus-kas.component';
import {SaldoawallakService} from 'src/app/core/services/saldoawallak.service';

@Component({
  selector: 'app-saldo-awal-aruskas-form',
  templateUrl: './saldo-awal-aruskas-form.component.html',
  styleUrls: ['./saldo-awal-aruskas-form.component.scss']
})
export class SaldoAwalAruskasFormComponent implements OnInit {
  loading_post: boolean;
  uiRek: IDisplayGlobal;
  rekSelected: any;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  @Output() callback = new EventEmitter();
  @ViewChild(LookRekArusKasComponent,{static: true}) Rekening : LookRekArusKasComponent;
  constructor(
    private service: SaldoawallakService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.uiRek = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idsaldo: 0,
      idunit: [0, [Validators.required, Validators.min(1)]],
      idrek: [0, [Validators.required, Validators.min(1)]],
      nilai: 0
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookRekening(){
    this.Rekening.title = 'Pilih Rekening';
    this.Rekening.gets({Mtglevel: '3', Type: 'D'});
    this.Rekening.showThis = true;
  }
  callBackRekening(e: IDaftrekening){
    this.rekSelected = e;
    this.uiRek = {kode: e.kdper, nama: e.nmper};
    this.forms.patchValue({
      idrek: this.rekSelected.idrek
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
    this.uiRek = {kode: '', nama: ''};
    this.rekSelected = null;
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}

