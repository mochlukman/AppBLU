import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message, SelectItem} from 'primeng/api';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IBkbkas} from 'src/app/core/interface/ibkbkas';
import {ISkp} from 'src/app/core/interface/iskp';
import {LookRekeningBudComponent} from 'src/app/shared/lookups/look-rekening-bud/look-rekening-bud.component';
import {LookSkpComponent} from 'src/app/shared/lookups/look-skp/look-skp.component';
import {Ibend} from 'src/app/core/interface/ibend';
import {LookBendaharaComponent} from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import {StsService} from 'src/app/core/services/sts.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {StattrsService} from 'src/app/core/services/stattrs.service';
import {IStattrs} from 'src/app/core/interface/istattrs';
import { indoKalender } from 'src/app/core/local';

@Component({
  selector: 'app-sts-penetapan-form',
  templateUrl: './sts-penetapan-form.component.html',
  styleUrls: ['./sts-penetapan-form.component.scss']
})
export class StsPenetapanFormComponent implements OnInit {
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
  uiBud: IDisplayGlobal;
  budSelected: IBkbkas;
  uiSkp: IDisplayGlobal;
  skpSelected: ISkp;
  @ViewChild(LookRekeningBudComponent, {static: true}) Bud : LookRekeningBudComponent;
  @ViewChild(LookSkpComponent, {static: true}) Skp : LookSkpComponent;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  constructor(
    private service: StsService,
    private fb: FormBuilder,
    private notif: NotifService,
    private authService: AuthenticationService,
    private stattrsService: StattrsService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      idsts : 0,
      idunit : [0, [Validators.required, Validators.min(1)]],
      nosts : ['', Validators.required],
      kdstatus : ['', Validators.required],
      idbend : [0, [Validators.required, Validators.min(1)]],
      idxkode : 1,
      tglsts : null,
      tglvalid: null,
      nobbantu: ['', Validators.required],
      uraian : ['', Validators.required],
      idskp: 0,
      jabbend: '',
      idpeg: 0
    });
    this.initialForm = this.forms.value;
    this.uiBud = {kode: '', nama: ''};
    this.uiSkp = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
  }
  getStattrs(){
    this.listStattrs = [
      {label: 'Pilih', value: null}
    ];
    this.stattrsService.getBylist('66')
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
      this.service.getNoreg(this.forms.value.idunit).subscribe(resp =>  {
        let label = this.listStattrs.find(f => f.value == e.value);
        let label_split = label.label.split(':');
        this.forms.patchValue({
          kdstatus:  e.value,
          nosts: `${resp.noreg}/STS-${label_split[0]}/${this.unitSelected.kdunit}/${this.forms.value.jabbend}/${this.userInfo.NmTahun}`,
        });
      });
    } else {
      this.forms.patchValue({
        kdstatus: '',
        nosts: '',
      });
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Jenis Bukti'});
    }
  }
  lookBendahara(){
    this.Bendahara.title = 'Pilih Bendahara';
    this.Bendahara.gets(this.forms.value.idunit, '01');
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
  lookBud(){
    this.Bud.title = 'Pilih Rekening BUD';
    this.Bud.Idunit = this.forms.value.idunit;
    this.Bud.gets();
    this.Bud.showThis = true;
  }
  callBackBud(e: IBkbkas){
    this.budSelected = e;
    this.uiBud = {
      kode: this.budSelected.nobbantu,
      nama: this.budSelected.nmbkas
    };
    this.forms.patchValue({
      nobbantu: this.budSelected.nobbantu
    });
  }
  lookSkp(){
    if(this.forms.value.kdstatus != ''){
      this.Skp.title = 'Pilih SKP';
      this.Skp.gets(this.forms.value.idunit, this.forms.value.idbend, null, this.forms.value.idxkode);
      this.Skp.showThis = true;
    } else {
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Jenis Bukti'});
    }

  }
  callBackSkp(e: ISkp){
    this.skpSelected = e;
    this.uiSkp = {
      kode: this.skpSelected.noskp,
      nama: this.skpSelected.tglskp
    };
    this.forms.patchValue({
      idskp: this.skpSelected.idskp
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      this.forms.patchValue({
        tglsts: this.forms.value.tglsts !== null ? new Date(this.forms.value.tglsts).toLocaleDateString('en-US') : null,
        tglvalid: this.forms.value.tglvalid !== null ? new Date(this.forms.value.tglvalid).toLocaleDateString('en-US') : null
      });
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
    this.getStattrs();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.msg = [];
    this.loading_post = false;
    this.stattrsSelected = null;
    this.unitSelected = null;
    this.showThis = false;
    this.jenisBukti = '';
    this.uiBud = {kode: '', nama: ''};
    this.budSelected = null;
    this.uiSkp = {kode: '', nama: ''};
    this.skpSelected = null;
    this.uiBend = {kode: '', nama: ''};
    this.bendSelected = null;
  }
}

