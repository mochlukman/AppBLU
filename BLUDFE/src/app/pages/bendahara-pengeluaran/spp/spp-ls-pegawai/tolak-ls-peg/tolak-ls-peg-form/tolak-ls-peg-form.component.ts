import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpd } from 'src/app/core/interface/ispd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BulanService } from 'src/app/core/services/bulan.service';
import { SpddetrService } from 'src/app/core/services/spddetr.service';
import { SppService } from 'src/app/core/services/spp.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-tolak-ls-peg-form',
  templateUrl: './tolak-ls-peg-form.component.html',
  styleUrls: ['./tolak-ls-peg-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class TolakLsPegFormComponent implements OnInit {
  loading_post: boolean;
  uiSpd: IDisplayGlobal;
  spdSelected: ISpd;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  indoKalender: any;
  listBulan: SelectItem[] = [];
  bulanSelected: any;
  listRincianGaji: SelectItem[] = [];
  rincianGajiSelected: any;
  nmstatus: string;
  userInfo: ITokenClaim;
  totalSpp: string;
  totalSpd: string;
  initialForm: any;
  constructor(
    private service: SppService,
    private fb: FormBuilder,
    private notif: NotifService,
    private bulanService: BulanService,
    private authService: AuthenticationService,
    private sppdetrService: SppdetrService,
    private spddetrService: SpddetrService,
    private stattrsService: StattrsService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.uiSpd = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idspp : 0,
      idunit : [0, Validators.required],
      nospp : ['', Validators.required],
      kdstatus : ['', Validators.required],
      idbulan : [null, Validators.required],
      idbend : null,
      idspd : [null, Validators.required],
      idphk3 : null,
      idxkode : [0, Validators.required],
      noreg : '',
      ketotor : '',
      idkontrak : null,
      keperluan : '',
      tglspp : {value: null, disabled: true},
      status : null,
      nilaiup: 0,
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
  getRincianGaji(){
    this.listRincianGaji = [
      {label: 'Pilih' , value: null},
      {label: 'Manual Entri' , value: '1'},
      {label: 'Upload Rincian Gaji' , value: '2'}
    ];
  }
  changeRincianGaji(e: any){

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
    this.getRincianGaji();
    if(this.mode == 'edit'){
      this.getTotalNilai();
      this.stattrsService.get(this.forms.value.kdstatus.trim())
          .subscribe(resp => this.nmstatus = resp.lblstatus.trim());
    }
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.forms.controls['tglspp'].disable();
    this.showThis = false;
    this.msg = [];
    this.uiSpd = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.spdSelected = null;
    this.bendSelected = null;
    this.loading_post = false;
    this.nmstatus = '';
    this.bulanSelected = null;
    this.listBulan = [];
    this.totalSpp = '';
    this.totalSpd = '';
  }
}
