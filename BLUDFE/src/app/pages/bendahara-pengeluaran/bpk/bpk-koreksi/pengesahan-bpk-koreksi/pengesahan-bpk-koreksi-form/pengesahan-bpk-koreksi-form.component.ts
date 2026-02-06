import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IJbayar } from 'src/app/core/interface/ijbayar';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { IStattrs } from 'src/app/core/interface/istattrs';
import { ITagihan } from 'src/app/core/interface/itagihan';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkService } from 'src/app/core/services/bpk.service';
import { JbayarService } from 'src/app/core/services/jbayar.service';
import { JtransferService } from 'src/app/core/services/jtransfer.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pengesahan-bpk-koreksi-form',
  templateUrl: './pengesahan-bpk-koreksi-form.component.html',
  styleUrls: ['./pengesahan-bpk-koreksi-form.component.scss']
})
export class PengesahanBpkKoreksiFormComponent implements OnInit {
  showThis: boolean;
  loading_post: boolean;
  title: string;
  mode: string;
  forms: FormGroup
  msg: Message[];
  indoKalender: any;
  userInfo: ITokenClaim;
  initialForm: any;
  @Output() callback = new EventEmitter();
  uiTagihan: IDisplayGlobal;
  tagihanSelected: ITagihan;
  listStattrs: SelectItem[] = [];
  stattrsSelected: any;
  unitSelected: IDaftunit;
  listJbayar: IJbayar[] = [];
  listJtransfer: SelectItem[] = [];
  jtransferSelected: any;
  isTransfer: boolean;
  uiSp2d: IDisplayGlobal;
  sp2dSelected: ISp2d;
  isTU: boolean;
  jenisBukti: string;
  constructor(
    private service: BpkService,
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService,
    private stattrsService: StattrsService,
    private jbayarService: JbayarService,
    private jtransferService: JtransferService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idbpk : 0,
      idunit : [0, [Validators.required, Validators.min(1)]],
      idkeg: 0,
      idphk3 : 0,
      idtagihan: 0,
      nobpk : ['', Validators.required],
      kdstatus : ['', Validators.required],
      idjbayar : {value: 0, disabled: true},
      idjtransfer: 0,
      idxkode : [0, [Validators.required, Validators.min(1)]],
      tglbpk : {value: null, disabled: true},
      penerima : '',
      uraibpk : ['', Validators.required],
      idsp2d: 0,
      tglvalid: null,
      valid: null,
      verifikasi: ''
    });
    this.initialForm = this.forms.value;
    this.uiTagihan = {kode: '', nama: ''};
    this.uiSp2d = {kode: '', nama: ''};
  }
  getStattrs(){
    this.listStattrs = [
      {label: 'Pilih', value: null}
    ];
    this.stattrsService.getBylist('20')
      .subscribe(resp => {
        let tempjBukti: IStattrs[] = [];
        if(resp.length > 0 ){
          tempjBukti = resp;
          tempjBukti.forEach(e => {
            this.listStattrs.push({label: `${e.lblstatus} : ${e.uraian}`, value: e.kdstatus})
          });
        }
        if(this.mode === 'edit'){
          if(this.forms.value.kdstatus != null && this.forms.value.kdstatus != ''){
            this.stattrsSelected = this.listStattrs.find(w => w.value == this.forms.value.kdstatus).value;
            if(tempjBukti.length > 0){
              let jbukti = tempjBukti.find(f => f.kdstatus.trim() == this.forms.value.kdstatus.trim());
              if(jbukti != null){
                this.jenisBukti =  `${jbukti.lblstatus} : ${jbukti.uraian}`;
              }
            }

          }
        }
      });
  }
  changeStattrs(e: any){
    if(e.value){
      let label = this.listStattrs.find(f => f.value == e.value);
      let label_split = label.label.split(':');
      this.forms.patchValue({
        kdstatus:  e.value,
        nobpk: `XXXXX/BPK-${label_split[0].trim()}/${this.unitSelected.kdunit}/${this.userInfo.NmTahun}`,
      });
      if(label_split[0].trim() == 'TU'){
        this.isTU = true;
      } else {
        this.isTU = false;
        this.sp2dSelected = null;
        this.uiSp2d = {kode: '', nama: ''};
        this.forms.patchValue({
          idsp2d: 0,
        });
      }
    } else {
      this.forms.patchValue({
        kdstatus: '',
        nobpk: '',
        idsp2d: 0,
      });
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Jenis Bukti'});
      this.isTU = false;
      this.sp2dSelected = null;
      this.uiSp2d = {kode: '', nama: ''};
    }
  }
  getJbayar(){
    this.listJbayar = [];
    this.jbayarService.gets()
      .subscribe(resp => {
        if(resp.length){
          this.listJbayar = resp.filter(m => m.kdbayar != 0);
        }
      });
  }
  onClickBayar(e: any){
    if(this.forms.value.idjbayar == 2){
      this.isTransfer = true;
    } else {
      this.isTransfer = false;
      this.forms.patchValue({
        idjtransfer: 0
      });
      this.jtransferSelected = null;
    }
  }
  getJtransfer(){
    this.listJtransfer = [
      {label: 'Pilih Jenis Transfer', value: null}
    ];
    this.jtransferService.gets()
      .subscribe(resp => {
        if(resp.length > 0 ){
          let tempList = resp.filter(m => m.kdtransfer != 0);
          tempList.forEach(e => {
            this.listJtransfer.push({label: `${e.kdtransfer} : ${e.nmtransfer.trim()}`, value: e.idjtransfer})
          });
        }
        if(this.mode === 'edit'){
          if(this.forms.value.idjtransfer != null && this.forms.value.kdstatus != '' && this.forms.value.idjbayar == 2){
            this.isTransfer = true
            this.jtransferSelected = this.listJtransfer.find(w => w.value == this.forms.value.idjtransfer).value;
          }
        }
      });
  }
  changeJtransfer(e: any){
    if(e.value){
      this.forms.patchValue({
        idjtransfer: e.value
      });
    }
  }
  ngOnInit() {
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
      });
      this.forms.controls['tglbpk'].enable();
      if(this.mode === 'edit'){
        this.service.pengesahan(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
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
  onShow(){
    this.getStattrs();
    this.getJbayar();
    this.getJtransfer();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.forms.controls['tglbpk'].disable();
    this.msg = [];
    this.loading_post = false;
    this.uiTagihan = {kode: '', nama: ''};
    this.tagihanSelected = null;
    this.stattrsSelected = null;
    this.unitSelected = null;
    this.listJbayar = [];
    this.showThis = false;
    this.jtransferSelected = null;
    this.isTransfer = false;
    this.uiSp2d = {kode: '', nama: ''};
    this.isTU = false;
    this.jenisBukti = '';
  }
}
