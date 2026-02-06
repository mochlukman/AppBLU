import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IKontrak} from 'src/app/core/interface/ikontrak';
import {Message, SelectItem} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LookKontrakComponent} from 'src/app/shared/lookups/look-kontrak/look-kontrak.component';
import {TagihanService} from 'src/app/core/services/tagihan.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {indoKalender } from 'src/app/core/local';
import {ITokenClaim } from 'src/app/core/interface/itoken-claim';
import {AuthenticationService } from 'src/app/core/services/auth.service';
import {IStattrs} from 'src/app/core/interface/istattrs';
import {StattrsService} from 'src/app/core/services/stattrs.service';
import { BulanService } from 'src/app/core/services/bulan.service';
import {InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { ITagihan } from 'src/app/core/interface/itagihan';

@Component({
  selector: 'app-tagihan-pembuatan-form',
  templateUrl: './tagihan-pembuatan-form.component.html',
  styleUrls: ['./tagihan-pembuatan-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class TagihanPembuatanFormComponent implements OnInit {
  loading_post: boolean;
  uiKontrak: IDisplayGlobal;
  kontrakSelected: IKontrak;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  indoKalender: any;
  listStattrs: SelectItem[] = [];
  stattrsSelected: any;
  jenisBukti: string;
  listBulan: SelectItem[] = [];
  bulanSelected: any;
  initialForm: any;
   userInfo: ITokenClaim;
  @ViewChild(LookKontrakComponent, {static: true}) Kontrak : LookKontrakComponent;
  constructor(
    private service: TagihanService,
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService,
    private stattrsService: StattrsService,
    private bulanService: BulanService,
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.uiKontrak = {kode: '', nama: ''};
  
    this.forms = this.fb.group({
      idtagihan : 0,
      idunit :  [0, Validators.required],
      idkeg :  [0, Validators.required],
      notagihan : ['', Validators.required],
      tgltagihan : null,
      idkontrak :  [0, Validators.required],
      uraiantagihan :  '',
      bulan :  '',
      idbulan :  0,
      idbend : null,
      nofaktur :  '',
      nilaippn : 0,
      kdstatus :  '',
    });
    this.indoKalender = indoKalender;
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  getStattrs(){
    this.listStattrs = [
      {label: 'Pilih', value: null}
    ];
    this.stattrsService.getBylist('71,79')
      .subscribe(resp => {
        let tempjBukti: IStattrs[] = [];
        if(resp.length > 0 ){
          tempjBukti = resp;
          tempjBukti.forEach(e => {
            this.listStattrs.push({label: `${e.lblstatus}`, value: e.kdstatus})
          });
        }
        if(this.mode === 'edit'){
          if(this.forms.value.kdstatus != null && this.forms.value.kdstatus != ''){
            this.stattrsSelected = this.listStattrs.find(w => w.value == this.forms.value.kdstatus).value;
            if(tempjBukti.length > 0){
              let jbukti = tempjBukti.find(f => f.kdstatus.trim() == this.forms.value.kdstatus.trim());
              if(jbukti != null){
                this.jenisBukti =  `${jbukti.lblstatus}`;
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
      });
    } else {
      this.forms.patchValue({
        kdstatus: '',
      });
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Status'});
    }
  }
  lookKontrak(){
    this.Kontrak.title = 'Pilih Kontrak';
    this.Kontrak.params = {
      'Parameters.Idunit' : this.forms.value.idunit,
      'Parameters.Idkeg' : this.forms.value.idkeg,
      'Parameters.Idphk3' : 0,
      'Parameters.NoKontrakExist': 'true'
    }
    this.Kontrak.showThis = true;
  }

  callbackKontrak(e: IKontrak){
      this.kontrakSelected = e;
      this.uiKontrak = {kode: e.nokontrak, nama: e.uraian};
      this.forms.patchValue({
        idkontrak: e.idkontrak
      });  
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
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tgltagihan: this.forms.value.tgltagihan !== null ? new Date(this.forms.value.tgltagihan).toLocaleDateString('en-US') : null
      });
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
    this.getStattrs();
    this.getBulan();
  }
  onHide(){
    this.uiKontrak = {kode: '', nama: ''};
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.kontrakSelected = null;
    this.bulanSelected = null;
    this.listBulan = [];
  }
}
