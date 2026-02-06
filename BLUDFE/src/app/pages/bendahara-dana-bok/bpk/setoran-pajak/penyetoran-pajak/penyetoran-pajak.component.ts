import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {IBpkpajakstr} from 'src/app/core/interface/ibpkpajakstr';
import {LookDaftunitComponent} from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {BpkpajakstrService} from 'src/app/core/services/bpkpajakstr.service';
import {DaftunitService } from 'src/app/core/services/daftunit.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {
  PenyetoranPajakFormComponent
} from 'src/app/pages/bendahara-dana-bok/bpk/setoran-pajak/penyetoran-pajak/penyetoran-pajak-form/penyetoran-pajak-form.component';
import {LookBendaharaComponent} from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import {Ibend} from 'src/app/core/interface/ibend';

@Component({
  selector: 'app-penyetoran-pajak',
  templateUrl: './penyetoran-pajak.component.html',
  styleUrls: ['./penyetoran-pajak.component.scss']
})
export class PenyetoranPajakComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IBpkpajakstr[] = [];
  dataSelected: IBpkpajakstr = null;
  @ViewChild(LookDaftunitComponent, { static: true }) Daftunit: LookDaftunitComponent;
  @ViewChild(PenyetoranPajakFormComponent, {static: true}) Form: PenyetoranPajakFormComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild('dt', { static: false }) dt: any;
  formFilter: FormGroup;
  initialForm: any;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  constructor(
    private auth: AuthenticationService,
    private service: BpkpajakstrService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode : '', nama : ''};
    this.uiBend = {kode : '', nama : ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdstatus: ['36', Validators.required],
      idbend: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.formFilter.value;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 0){
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
     } else {
       this.ngOnDestroy();
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
    this.listdata = [];
    this.dataSelected = null;
    this.bendSelected = null;
    this.uiBend = {kode : '', nama : ''};
    this.gets();
  }
  lookBendahara(){
    if(this.unitSelected){
      this.Bendahara.title = 'Pilih Bendahara';
      this.Bendahara.gets(this.formFilter.value.idunit,'03');
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
    this.listdata = [];
    this.dataSelected = null;
    this.gets();
  }
  callback(e: any) {
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      this.listdata.splice(this.listdata.findIndex(i => i.idbpkpajakstr === e.data.idbpkpajakstr), 1, e.data);
    }
    this.dataSelected = null;
  }
  gets(){
    if(this.formFilter.valid && this.tabIndex == 0){
      this.loading = true;
      this.listdata = [];
      this.dataSelected = null;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._idbend = this.formFilter.value.idbend;
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service.gets().subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
        this.loading = false;
      }, error => {
        this.loading = false;
        if (Array.isArray(error.error.error)) {
          for (var i = 0; i < error.error.error.length; i++) {
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
  }
  callbackdet(e: any){
    this.listdata.map(m => {
      if(m.idbpkpajakstr == e.idbpkpajakstr){
        m.nilai = e.nilai;
      }
    });
  }
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idunit : this.formFilter.value.idunit,
      idbend: this.formFilter.value.idbend
    });
    this.Form.showThis = true;
  }
  edit(e: IBpkpajakstr){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idbpkpajakstr : e.idbpkpajakstr,
      idunit : e.idunit,
      idbend: e.idbend,
      uraian : e.uraian,
      nomor : e.nomor,
      tanggal :e.tanggal ? new Date(e.tanggal) : null,
      kdstatus : e.kdstatus.trim()
    });
    this.Form.showThis = true;
  }
  delete(e: IBpkpajakstr){
    this.notif.confir({
      message: ``,
      accept: () => {
        this.service.delete(e.idbpkpajakstr).subscribe(
          (resp) => {
            if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idbpkpajakstr !== e.idbpkpajakstr);
              this.notif.success('Data berhasil dihapus');
              if(this.dt) this.dt.reset();
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
  dataClick(e: IBpkpajakstr){
    this.dataSelected = e;
  }
  ngOnDestroy(): void {
    this.formFilter.reset(this.initialForm);
    this.uiUnit = { kode: '', nama: '' };
    this.uiBend = {kode : '', nama : ''};
    this.unitSelected = null;
    this.bendSelected = null;
    this.listdata = [];
    this.dataSelected = null;
  }
}
