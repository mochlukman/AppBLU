import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IBulan } from 'src/app/core/interface/ibulan';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IJtermorlun } from 'src/app/core/interface/ijtermorlun';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { BulanService } from 'src/app/core/services/bulan.service';
import { JtermorlunService } from 'src/app/core/services/jtermorlun.service';
import { KontrakdetrService } from 'src/app/core/services/kontrakdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftrekByRkarComponent } from 'src/app/shared/lookups/look-daftrek-by-rkar/look-daftrek-by-rkar.component';

@Component({
  selector: 'app-form-kontrak-detail',
  templateUrl: './form-kontrak-detail.component.html',
  styleUrls: ['./form-kontrak-detail.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormKontrakDetailComponent implements OnInit {
  loading_post: boolean;
  uiRek: IDisplayGlobal;
  rekSelected: IDaftrekening;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listBulan: IBulan[] = [];
  bulanSelected: IBulan;
  listTermin: IJtermorlun[] = [];
  terminSelected: IJtermorlun;
  @Output() callBack = new EventEmitter();
  @ViewChild(LookDaftrekByRkarComponent,{static: true}) Rekening : LookDaftrekByRkarComponent;
  constructor(
    private service: KontrakdetrService,
    private fb: FormBuilder,
    private notif: NotifService,
    private bulanService: BulanService,
    private terminService: JtermorlunService
  ) {
    this.uiRek = {kode: '', nama: ''};
    this.forms = this.fb.group({
      iddetkontrak : 0,
      idkontrak : [0, Validators.required], 
      idrek : [0, [Validators.required, Validators.min(1)]],
      idbulan: [0, [Validators.required, Validators.min(1)]],
      idjtermorlun: 0,
      nilai : 0,
      idunit: 0,
      idkeg: 0,
    });
  }
  ngOnInit(){
  }
  lookRekening(){
    this.Rekening.title = 'Pilih Rekening';
    this.Rekening.gets(this.forms.value.idunit, this.forms.value.idkeg);
    this.Rekening.showThis = true;
  }
  callBackRekening(e: IDaftrekening){
    this.rekSelected = e;
    this.uiRek = {kode: e.kdper, nama: e.nmper};
    this.forms.patchValue({
      idrek: this.rekSelected.idrek
    });
  }
  bulanChange(e: any){
    this.forms.patchValue({
      idbulan : this.bulanSelected.idbulan,
    });
  }
  getBulan(){
    this.bulanService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          this.listBulan = [...resp];
          if(this.mode === 'edit'){
            this.bulanSelected = this.listBulan.find(w => w.idbulan == this.forms.value.idbulan);
          }
        }
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
      })
  }
  getTermin(){
    this.terminService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          this.listTermin = [...resp];
          if(this.mode === 'edit'){
            this.terminSelected = this.listTermin.find(w => w.idjtermorlun == this.forms.value.idjtermorlun);
          }
        }
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
      })
  }
  terminChange(e: any){
    this.forms.patchValue({
      idjtermorlun : this.terminSelected.idjtermorlun
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
    this.getBulan();
    this.getTermin();
  }
  onHide(){
    this.forms.reset();
    this.forms.patchValue({
      iddetkontrak : 0,
      idkontrak : 0,
      idrek : 0,
      idbulan: 0,
      idjtermorlun: 0,
      nilai : 0,
      idunit: 0,
      idkeg: 0,
    });
    this.uiRek = {kode: '', nama: ''};
    this.rekSelected = null;
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}
