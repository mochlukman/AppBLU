import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { indoKalender } from 'src/app/core/local';
import {InputRupiahPipe} from 'src/app/core/pipe/input-rupiah.pipe';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message, SelectItem} from 'primeng/api';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {Ibend} from 'src/app/core/interface/ibend';
import {IDaftphk3} from 'src/app/core/interface/idaftphk3';
import {LookBendaharaComponent} from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import {LookPhk3Component} from 'src/app/shared/lookups/look-phk3/look-phk3.component';
import {SkpService} from 'src/app/core/services/skp.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {StattrsService} from 'src/app/core/services/stattrs.service';
import {IStattrs} from 'src/app/core/interface/istattrs';
@Component({
  selector: 'app-sp2t-form-pengesahan',
  templateUrl: './sp2t-form-pengesahan.component.html',
  styleUrls: ['./sp2t-form-pengesahan.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class Sp2tFormPengesahanComponent implements OnInit {
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
  listStattrs: SelectItem[] = [];
  stattrsSelected: any;
  unitSelected: IDaftunit;
  jenisBukti: string;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  uiPhk3: IDisplayGlobal;
  phk3Selected: IDaftphk3;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild(LookPhk3Component, {static: true}) Phk3 : LookPhk3Component;
  constructor(
    private service: SkpService,
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService,
    private stattrsService: StattrsService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idskp : 0,
      idunit : [0, [Validators.required, Validators.min(1)]],
      noskp : ['', Validators.required],
      kdstatus : ['', Validators.required],
      idbend : [0, [Validators.required, Validators.min(1)]],
      idxkode : 1,
      tglskp : {value: null, disabled: true},
      penyetor: '',
      alamat: '',
      uraiskp : ['', Validators.required],
      tgltempo : {value: null, disabled: true},
      tglvalid : null,
      valid: null,
      jabbend: '',
      idpeg: 0,
      idphk3: 0
    });
    this.initialForm = this.forms.value;
    this.uiBend = {kode: '', nama: ''};
    this.uiPhk3 = {kode: '', nama: ''};
  }
  lookPhk3(){
    this.Phk3.title = 'Pilih Penyetor';
    this.Phk3.gets(this.forms.value.idunit);
    this.Phk3.showThis = true;
  }
  callbackPhk3(e: any){
    this.phk3Selected = e;
    this.uiPhk3 = {kode: this.phk3Selected.nmphk3, nama: this.phk3Selected.nminst};
    this.forms.patchValue({
      idphk3: this.phk3Selected.idphk3
    });
  }
  getStattrs(){
    this.listStattrs = [
      {label: 'Pilih', value: null}
    ];
    this.stattrsService.getBylist('77')
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
        noskp: `XXXXX/SP2T/${this.unitSelected.kdunit}/${this.forms.value.jabbend}/${this.userInfo.NmTahun}`,
      });
    } else {
      this.forms.patchValue({
        kdstatus: '',
        noskp: '',
      });
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Jenis Bukti'});
    }
  }
  lookBendahara(){
    this.Bendahara.title = 'Pilih Bendahara';
    this.Bendahara.gets(this.forms.value.idunit);
    this.Bendahara.showThis = true;
  }
  callBackBendahara(e: Ibend){
    this.bendSelected = e;
    this.forms.patchValue({
      idbend: this.bendSelected.idbend,
      idpeg: this.bendSelected.idpeg,
      jabbend: this.bendSelected.jabbend
    });
    this.uiBend = {
      kode: this.bendSelected.idpegNavigation.nip,
      nama: this.bendSelected.idpegNavigation.nama + ',' + this.bendSelected.jnsbendNavigation.jnsbend.trim() + ' - ' + this.bendSelected.jnsbendNavigation.uraibend.trim()
    };
  }
  ngOnInit() {
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
      });
      this.forms.patchValue({
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
      });
      this.forms.controls['tglskp'].enable();
      this.forms.controls['tgltempo'].enable();
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
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.forms.controls['tglskp'].disable();
    this.forms.controls['tgltempo'].disable();
    this.msg = [];
    this.loading_post = false;
    this.stattrsSelected = null;
    this.unitSelected = null;
    this.showThis = false;
    this.jenisBukti = '';
    this.uiBend = {kode: '', nama: ''};
    this.uiPhk3 = {kode: '', nama: ''};
    this.bendSelected = null;
  }
}
