import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {InputRupiahPipe} from 'src/app/core/pipe/input-rupiah.pipe';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {Message} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IDaftrekening} from 'src/app/core/interface/idaftrekening';
import {ITagihan} from 'src/app/core/interface/itagihan';
import {LookDaftrekBydpaComponent} from 'src/app/shared/lookups/look-daftrek-bydpa/look-daftrek-bydpa.component';
import {TagihandetService} from 'src/app/core/services/tagihandet.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {DaftrekeningService} from 'src/app/core/services/daftrekening.service';

@Component({
  selector: 'app-tagihan-pembuatan-detail-form',
  templateUrl: './tagihan-pembuatan-detail-form.component.html',
  styleUrls: ['./tagihan-pembuatan-detail-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class TagihanPembuatanDetailFormComponent implements OnInit {
  loading_post: boolean;
  uiRek: IDisplayGlobal;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  rekeningSelected: IDaftrekening;
  keyword: string;
  @Output() callBack = new EventEmitter();
  tagihanSelected: ITagihan;
  @ViewChild(LookDaftrekBydpaComponent, {static: true}) Daftrek : LookDaftrekBydpaComponent;
  constructor(
    private service: TagihandetService,
    private fb: FormBuilder,
    private notif: NotifService,
    private rekening: DaftrekeningService
  ) {
    this.uiRek = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idtagihandet : 0,
      idtagihan : [0, Validators.required],
      idrek : [0, [Validators.required, Validators.min(1)]],
      nilai : [0]
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookDaftrek(){
    if(this.tagihanSelected){
      this.Daftrek.title = 'Pilih Rekening';
      this.Daftrek._idunit = this.tagihanSelected.idunit;
      this.Daftrek._idkeg = this.tagihanSelected.idkeg;
      this.Daftrek._Mtglevel = '6';
      this.Daftrek._kdperStartwith = this.tagihanSelected.kdstatus.trim() == '71' ? '5.' : 'non-modal';
      this.Daftrek.showThis=true;
    }
  }
  callBackDaftrek(e: IDaftrekening){
    this.rekeningSelected = e;
    this.uiRek = {
      kode: this.rekeningSelected.kdper,
      nama: this.rekeningSelected.nmper
    };
    this.forms.patchValue({
      idrek: this.rekeningSelected.idrek
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
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.uiRek = {kode: '', nama: ''};
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.keyword = null;
    this.rekeningSelected = null;
  }
}
