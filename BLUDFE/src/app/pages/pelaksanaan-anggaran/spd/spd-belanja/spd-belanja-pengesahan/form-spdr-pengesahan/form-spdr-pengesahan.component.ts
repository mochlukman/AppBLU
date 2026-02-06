import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { indoKalender } from 'src/app/core/local';
import { BulanService } from 'src/app/core/services/bulan.service';
import { JabttdService } from 'src/app/core/services/jabttd.service';
import { SpdService } from 'src/app/core/services/spd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-form-spdr-pengesahan',
  templateUrl: './form-spdr-pengesahan.component.html',
  styleUrls: ['./form-spdr-pengesahan.component.scss']
})
export class FormSpdrPengesahanComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  bulan1: SelectItem[] = [];
  bulan1Selected: SelectItem;
  bulan2: SelectItem[] = [];
  bulan2Selected: SelectItem;
  ttd: SelectItem[] = [];
  ttdSelected: SelectItem;
  @ViewChild('ddttd',{static:true}) ddttd: any;
  initialForm: any;
  constructor(
    private service: SpdService,
    private fb: FormBuilder,
    private notif: NotifService,
    private bulanService: BulanService,
    private ttdService: JabttdService
  ) {
    this.forms = this.fb.group({
      idkeg: [0],
      idspd: [0],
      idunit: [0, Validators.required],
      idxkode: [0, Validators.required],
      idbulan1: [0, [Validators.required, Validators.min(1)]],
      idbulan2: [0, [Validators.required, Validators.min(1)]],
      nospd: ['', Validators.required],
      tglspd: {value: null, disabled: true},
      keterangan: [''],
      idttd: [0],
      valid: null,
      tglvalid: null,
      transfer: true
    });
    this.initialForm = this.forms.value;
    this.indoKalender = indoKalender;
  }

  ngOnInit(){
  }
  changeBulan1(e: any){
    if(this.forms.value.idbulan2 != 0){
      if(e.value > this.forms.value.idbulan2){
        this.msg = [];
        this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Bulan Awal Melebihi Bulan Akhir'});
      }
      this.forms.patchValue({
        idbulan1: e.value
      });
    } else {
      this.forms.patchValue({
        idbulan1: e.value
      });
    }
  }
  changeBulan2(e: any){
    if(e.value < this.forms.value.idbulan1){
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Bulan Akhir Kurang Dari Bulan Awal'});
    }
    this.forms.patchValue({
      idbulan2: e.value
    });
  }
  changeTtd(e: any){
    this.forms.patchValue({
      idttd: e.value
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
      });
      this.forms.controls['tglspd'].enable();
      if(this.mode === 'edit'){
        this.service.pengesahan(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callBack.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Pengesahan Data Berhasil');
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
  getBulan(){
    this.bulan1 = [];
    this.bulan2 = [];
    this.bulanService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          resp.forEach(x => {
            this.bulan1.push({label: x.ketBulan, value: x.idbulan});
            this.bulan2.push({label: x.ketBulan, value: x.idbulan});
          });
          if(this.mode === 'edit'){
            this.bulan1Selected = this.bulan1.find(w => w.value == this.forms.value.idbulan1).value;
            this.bulan2Selected = this.bulan2.find(w => w.value == this.forms.value.idbulan2).value;
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
      });
  }
  getTtd(){
    this.ttd = [];
    this.ttdService.gets('03.401')
      .subscribe(resp => {
        if(resp.length > 0){
          resp.forEach(x => {
            this.ttd.push({label: x.idpegNavigation.nip +' - '+x.idpegNavigation.nama, value:x.idttd});
          });
          if(this.mode === 'edit'){
            this.ttdSelected = this.ttd.find(w => w.value == this.forms.value.idttd).value;
          }
        }
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
      });
  }
  onShow(){
    this.getBulan();
    this.getTtd();
  }
  onHide(){
    this.forms.controls['tglspd'].disable();
    this.forms.reset(this.initialForm);
    this.bulan1 = [];
    this.bulan2 = [];
    this.bulan1Selected = null;
    this.bulan2Selected = null;
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.ddttd.resetFilter();
  }
}
