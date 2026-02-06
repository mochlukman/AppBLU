import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {SpptagService} from 'src/app/core/services/spptag.service';
import {LookTagihanCheckboxComponent} from 'src/app/shared/lookups/look-tagihan-checkbox/look-tagihan-checkbox.component';

@Component({
  selector: 'app-form-spp-detail-ls-non-pegawai-tagihan',
  templateUrl: './form-spp-detail-ls-non-pegawai-tagihan.component.html',
  styleUrls: ['./form-spp-detail-ls-non-pegawai-tagihan.component.scss']
})
export class FormSppDetailLsNonPegawaiTagihanComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  listdata: any[] = [];
  @Output() callback = new EventEmitter();
  @ViewChild(LookTagihanCheckboxComponent, {static: true}) Rekening : LookTagihanCheckboxComponent;
  listTagihanExist: number[] = [];
  @ViewChild('dt', {static:true}) dt: any;
  isvalid: boolean = false;
  initialValue: any;
  idunit: number = 0;
  idkeg: number = 0;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: SpptagService
  ) {
    this.forms = this.fb.group({
      idspptag : 0,
      idtagihans : ['', Validators.required],
      idspp : [0, Validators.required]
    });
    this.initialValue = this.forms.value;
  }
  ngOnInit(){
  }
  lookTagihan(){
    this.Rekening.title = 'Pilih Tagihan';
    const params = {
      'Idunit': this.idunit,
      'Idkeg': this.idkeg,
      'Isvalid': true
    };
    this.Rekening.gets(params);
    this.Rekening.showThis = true;
  }
  callbackTagihan(e: any[]){
    if(e){
      this.listdata = [];
      this.listdata = [...e];
      let temp_rek = this.listdata.map(m => m.idtagihan);
      this.forms.patchValue({
        idtagihans: temp_rek
      });
    }
  }
  HapusTagihan(e: any){
    this.listdata = this.listdata.filter(f => f.idtagihan !== e.idtagihan);
    let temp_rek = this.listdata.map(m => m.idtagihan);
    this.forms.patchValue({
      idtagihans: temp_rek
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
      }
    }
  }
  onShow(){
  }
  onHide(){
    this.forms.reset();
    this.forms.patchValue(this.initialValue);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.listdata = [];
    this.listTagihanExist = [];
    this.isvalid = false;
    this.idunit = 0;
    this.idkeg = 0;
  }
}
