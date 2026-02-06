import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {Ibend} from 'src/app/core/interface/ibend';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {IBkbank} from 'src/app/core/interface/ibkbank';
import {LookDaftunitComponent} from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import {LookBendaharaComponent} from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {BkbankService} from 'src/app/core/services/bkbank.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {DaftunitService} from 'src/app/core/services/daftunit.service';
import {
  PengesahanPergeseranUangFormComponent
} from 'src/app/pages/bendahara-pengeluaran/pergeseran/pergeseran/pengesahan-pergeseran-uang/pengesahan-pergeseran-uang-form/pengesahan-pergeseran-uang-form.component';

@Component({
  selector: 'app-pengesahan-pergeseran-uang',
  templateUrl: './pengesahan-pergeseran-uang.component.html',
  styleUrls: ['./pengesahan-pergeseran-uang.component.scss']
})
export class PengesahanPergeseranUangComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IBkbank[] = [];
  dataSelected: IBkbank = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild(PengesahanPergeseranUangFormComponent, {static: true}) Form: PengesahanPergeseranUangFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: BkbankService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      idbend: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.formFilter.value;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 1){
      if(this.userInfo.Idunit != 0){
        this.unitService.get(this.userInfo.Idunit).subscribe(resp => {
          this.callBackDaftunit(resp);
        },error => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(var i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
      }
    }
  }

  ngOnInit() {
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit,
      idbend: 0
    });
    this.dataSelected = null;
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
  }
  lookBendahara(){
    if(this.unitSelected){
      this.Bendahara.title = 'Pilih Bendahara';
      this.Bendahara.gets(this.formFilter.value.idunit,'02');
      this.Bendahara.showThis = true;
    } else {
      this.notif.warning('Pilih Unit');
    }

  }
  callBackBendahara(e: Ibend){
    this.bendSelected = e;
    this.uiBend = {
      kode: this.bendSelected.idpegNavigation.nip,
      nama: this.bendSelected.idpegNavigation.nama + ',' + this.bendSelected.jnsbendNavigation.jnsbend.trim() + ' - ' + this.bendSelected.jnsbendNavigation.uraibend.trim()
    };
    this.formFilter.patchValue({
      idbend: this.bendSelected.idbend
    });
    this.get();
  }
  get(){
    if(this.formFilter.valid && this.tabIndex == 1){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.formFilter.value.idunit, this.formFilter.value.idbend, '33,34')
        .subscribe(resp => {
          this.listdata = [];
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
        }, (error) => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idbkbank === e.data.idbkbank);
      this.listdata = this.listdata.filter(f => f.idbkbank != e.data.idbkbank);
      this.listdata.splice(index, 0, e.data);
    }
  }
  print(e: IBkbank){}
  update(e: IBkbank){
    this.Form.forms.patchValue({
      idbkbank : e.idbkbank,
      idunit : e.idunit,
      idbend : e.idbend,
      nobuku : e.nobuku,
      kdstatus : e.kdstatus,
      tglbuku : e.tglbuku != null ? new Date(e.tglbuku) : null,
      uraian : e.uraian,
      tglvalid: e.tglvalid,
      valid: e.valid
    });
    this.Form.unitSelected = this.unitSelected;
    this.Form.title = 'Pengesahan Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IBkbank){
    let postBody = {
      idbkbank : e.idbkbank,
      idunit : e.idunit,
      idbend : e.idbend,
      nobuku : e.nobuku,
      kdstatus : e.kdstatus,
      tglbuku : e.tglbuku != null ? new Date(e.tglbuku) : null,
      uraian : e.uraian,
      tglvalid: null,
      valid: null
    }
    this.notif.confir({
      message: `Batalkan Pengesahan ?`,
      accept: () => {
        this.service.pengesahan(postBody).subscribe(
          (resp) => {
            if (resp.ok) {
              this.callback({
                edited: true,
                data: resp.body
              });
              this.notif.success('Pengesahan Berhasil Dibatalkan');
            }
          }, (error) => {
            if(Array.isArray(error.error.error)){
              for(var i = 0; i < error.error.error.length; i++){
                this.notif.error(error.error.error[i]);
              }
            } else {
              this.notif.error(error.error);
            }
          });
      },
      reject: () => {
        return false;
      }
    });
  }
  dataKlick(e: IBkbank){
    if(this.unitSelected && this.bendSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Unit & Bendahara');
    }
  }
  ngOnDestroy(): void{
    this.listdata = [];
    this.uiUnit = { kode: '', nama: '' };
    this.unitSelected = null;
    this.dataSelected = null;
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
    if(this.formFilter) this.formFilter.reset(this.initialForm);
  }
}
