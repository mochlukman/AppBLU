import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftphk3 } from 'src/app/core/interface/idaftphk3';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpd } from 'src/app/core/interface/ispd';
import { ITagihan } from 'src/app/core/interface/itagihan';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BulanService } from 'src/app/core/services/bulan.service';
import { Daftphk3Service } from 'src/app/core/services/daftphk3.service';
import { KontrakService } from 'src/app/core/services/kontrak.service';
import { SpddetrService } from 'src/app/core/services/spddetr.service';
import { SppService } from 'src/app/core/services/spp.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { TagihanService } from 'src/app/core/services/tagihan.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import {IKontrak} from 'src/app/core/interface/ikontrak';

@Component({
  selector: 'app-tolak-ls-nonpeg-form',
  templateUrl: './tolak-ls-nonpeg-form.component.html',
  styleUrls: ['./tolak-ls-nonpeg-form.component.scss']
})
export class TolakLsNonpegFormComponent implements OnInit {
  loading_post: boolean;
  uiSpd: IDisplayGlobal;
  spdSelected: ISpd;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  uiTagihan: IDisplayGlobal;
  tagihanSelected: ITagihan;
  uiPhk3: IDisplayGlobal;
  phk3Selected: IDaftphk3;
  uiKontrak: IDisplayGlobal;
  kontrakSelected: IKontrak;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  indoKalender: any;
  listBulan: SelectItem[] = [];
  bulanSelected: any;
  nmstatus: string;
  userInfo: ITokenClaim;
  totalSpp: string;
  totalSpd: string;
  nokontrak: string;
  initialForm: any;
  constructor(
    private service: SppService,
    private fb: FormBuilder,
    private notif: NotifService,
    private bulanService: BulanService,
    private authService: AuthenticationService,
    private sppdetrService: SppdetrService,
    private spddetrService: SpddetrService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.uiSpd = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.uiTagihan = {kode: '', nama: ''};
    this.uiPhk3 = {kode: '', nama: ''};
    this.uiKontrak = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idspp : 0,
      idunit : [0, Validators.required],
      nospp : ['', Validators.required],
      kdstatus : ['', Validators.required],
      idbulan : [null, Validators.required],
      idbend : null,
      idspd : [0],
      idphk3 : null,
      idxkode : [0, Validators.required],
      noreg : '',
      ketotor : '',
      idkontrak : null,
      keperluan : '',
      tglspp : {value: null, disabled: true},
      status : null,
      nilaiup: 0,
      idkeg: 0,
      totalSpp: 0,
      totalSpd: 0,
      tglaprove: null,
      verifikasi: ''
    });
    this.indoKalender = indoKalender;
    this.initialForm = this.forms.value;
  }

  ngOnInit(){
  }
  getBulan(){
    this.listBulan = [];
    this.bulanService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          resp.forEach(x => {
            this.listBulan.push({label: x.ketBulan , value:x.idbulan});
          });
          if(this.mode === 'edit'){
            this.bulanSelected = this.listBulan.find(w => w.value == this.forms.value.idbulan).value;
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
  changeBulan(e: any){
    this.forms.patchValue({
      idbulan: e.value,
    });
  }
  getTotalNilai(){
    if(this.spdSelected){
      this.sppdetrService.getTotalNilai(
        this.forms.value.idunit,
        this.forms.value.idxkode,
        this.forms.value.kdstatus,
        this.forms.value.idspd
      ).subscribe(resp => {
        this.forms.patchValue({
          totalSpp: resp.totalSpp
        });
        this.totalSpp = new Intl.NumberFormat('ID').format(this.forms.value.totalSpp);
        this.spddetrService.getsTotalNilai(
          this.forms.value.idunit,
          this.forms.value.idspd
        ).subscribe(resp =>  {
          this.forms.patchValue({
            totalSpd: resp.totalSpd
          });
          this.totalSpd = new Intl.NumberFormat('ID').format(this.forms.value.totalSpd - this.forms.value.totalSpp);
        });
      });
    }
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglaprove: this.forms.value.tglaprove !== null ? new Date(this.forms.value.tglaprove).toLocaleDateString('en-US') : null
      });
      this.forms.controls['tglspp'].enable();
      if(this.mode === 'edit'){
        this.service.penolakan(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Approval Data Berhasil');
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
    if(this.mode == 'edit'){
      this.getTotalNilai();
    }
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.forms.controls['tglspp'].disable();
    this.showThis = false;
    this.msg = [];
    this.uiSpd = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.uiTagihan = {kode: '', nama: ''};
    this.uiPhk3 = {kode: '', nama: ''};
    this.uiKontrak = {kode: '', nama: ''};
    this.kontrakSelected = null;
    this.spdSelected = null;
    this.bendSelected = null;
    this.tagihanSelected = null;
    this.phk3Selected = null;
    this.loading_post = false;
    this.nmstatus = '';
    this.bulanSelected = null;
    this.listBulan = [];
    this.totalSpp = '';
    this.totalSpd = '';
    this.nokontrak = '';

  }
}
