import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { Ibend } from 'src/app/core/interface/ibend';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { TbpdettService } from 'src/app/core/services/tbpdett.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookBendaharaCheckboxComponent } from 'src/app/shared/lookups/look-bendahara-checkbox/look-bendahara-checkbox.component';

@Component({
  selector: 'app-peltu-bp-to-bp-detail-penerima-form',
  templateUrl: './peltu-bp-to-bp-detail-penerima-form.component.html',
  styleUrls: ['./peltu-bp-to-bp-detail-penerima-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class PeltuBpToBpDetailPenerimaFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  cols: any[];
  listdata: Ibend[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookBendaharaCheckboxComponent, {static: true}) Bendahara : LookBendaharaCheckboxComponent;
  listBendExist: number[] = [];
  @ViewChild('dt', {static:true}) dt: any;
  initialForm: any;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: TbpdettService
  ) {
    this.forms = this.fb.group({
      idtbpdett : 0,
      idtbp : [0, Validators.required],
      idbend : ['', Validators.required],
      nilai : 0,
      idunit: 0
    });
    this.initialForm = this.forms.value;
    this.cols = [
      {field: 'idpegNavigation.nip'},
      {field: 'idpegNavigation.nama'},
      {field: 'jnsbendNavigation.jnsbend'},
      {field: 'jnsbendNavigation.uraibend'},
      {field: 'rekbend'},
      {field: 'pilih'}
    ];
  }
  ngOnInit(){
  }
  lookBendahara(){
    this.Bendahara.title = 'Pilih Bendahara';
    this.Bendahara.gets(this.forms.value.idunit, '12');
    this.Bendahara.listBendExist = this.listBendExist;
    this.Bendahara.showThis = true;
  }
  callbackBendahara(e: Ibend[]){
    if(e){
      this.listdata = [];
      this.listdata = [...e];
      let temp_bend = this.listdata.map(m => m.idbend);
      this.forms.patchValue({
        idbend: temp_bend
      });
    }
  }
  HapusBend(e: Ibend){
    this.listdata = this.listdata.filter(f => f.idbend !== e.idbend);
    let temp_bend = this.listdata.map(m => m.idbend);
      this.forms.patchValue({
        idbend: temp_bend
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
    this.listBendExist = [];
  }
}
