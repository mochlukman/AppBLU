import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {InputRupiahPipe} from 'src/app/core/pipe/input-rupiah.pipe';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {Message} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LookPotonganComponent} from 'src/app/shared/lookups/look-potongan/look-potongan.component';
import {SppdetrpotService} from 'src/app/core/services/sppdetrpot.service';
import { indoKalender } from 'src/app/core/local';

@Component({
  selector: 'app-sp2d-ls-pegawai-potongan-form',
  templateUrl: './sp2d-ls-pegawai-potongan-form.component.html',
  styleUrls: ['./sp2d-ls-pegawai-potongan-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class Sp2dLsPegawaiPotonganFormComponent implements OnInit {
  loading_post: boolean;
  uiPotongan: IDisplayGlobal;
  potonganSelected: any;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  indoKalender: any;
  @ViewChild(LookPotonganComponent,{static: true}) Potongan : LookPotonganComponent;
  isvalid: boolean = false;
  initialvalue: any;
  constructor(
    private service: SppdetrpotService,
    private fb: FormBuilder,
  ) {
    this.uiPotongan = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idsppdetrpot :  0,
      idsppdetr :  [0, [Validators.required, Validators.min(1)]],
      idpot :  [0, [Validators.required, Validators.min(1)]],
      nilai :  0,
      keterangan :  ''
    });
    this.initialvalue = this.forms.value;
    this.indoKalender = indoKalender;
  }

  ngOnInit(){
  }
  lookPotongan(){
    this.Potongan.gets({type: "D"});
    this.Potongan.showThis = true;
  }
  callbackPotongan(e: any){
    this.potonganSelected = e;
    this.uiPotongan = {kode: this.potonganSelected.kdpot, nama: this.potonganSelected.mnpot};
    this.forms.patchValue({
      idpot: this.potonganSelected.idpot
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
      } else {
        this.loading_post = false;
        this.msg = [];
        this.msg.push({severity: 'error', summary: 'error', detail: 'Mode Form Tidak Diketahui'});
      }
    }
  }
  onShow(){

  }
  onHide(){
    this.forms.reset(this.initialvalue);
    this.showThis = false;
    this.msg = [];
    this.uiPotongan = {kode: '', nama: ''};
    this.potonganSelected = null;
    this.loading_post = false;
    this.isvalid = false;
  }
}
