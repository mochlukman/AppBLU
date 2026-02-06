import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IDisplayGlobal, ILookupTree} from 'src/app/core/interface/iglobal';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {LookDaftunitDpaComponent} from 'src/app/shared/lookups/look-daftunit-dpa/look-daftunit-dpa.component';
import {LookDpakegiatanComponent} from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {SpjapbdService} from 'src/app/core/services/spjapbd.service';
import {
  PembuatanSpjApbdFormComponent
} from 'src/app/pages/akuntansi/transaksi-apbd/realisasi-apbd/pembuatan-spj-apbd/pembuatan-spj-apbd-form/pembuatan-spj-apbd-form.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';

@Component({
  selector: 'app-pembuatan-spj-apbd',
  templateUrl: './pembuatan-spj-apbd.component.html',
  styleUrls: ['./pembuatan-spj-apbd.component.scss']
})
export class PembuatanSpjApbdComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  dataSelected: any = null;
  @ViewChild(LookDaftunitDpaComponent, {static: true}) Daftunit : LookDaftunitDpaComponent;
  @ViewChild(LookDpakegiatanComponent, {static: true}) Kegiatan : LookDpakegiatanComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(PembuatanSpjApbdFormComponent, {static: true}) Form: PembuatanSpjApbdFormComponent;
  kdstatus: string = '82';
  constructor(
    private auth: AuthenticationService,
    private service: SpjapbdService,
    private notif: NotifService,
    private unitService : DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiKeg = {kode: '', nama: ''};
  }
  /*ngOnChanges(changes: SimpleChanges): void {
   this.tabIndex;
   if(this.tabIndex == 0){
     this.uiUnit = { kode: '', nama: '' };
     this.uiKeg = { kode: '', nama: '' };
     this.dataSelected = null;
     this.unitSelected = null;
     this.kegSelected = null;
     this.listdata = [];
   }
  }*/

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
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.uiKeg = {kode: '', nama: ''};
    this.kegSelected = null;
    this.listdata = [];
    this.dataSelected = null;
  }
  lookKegiatan(){
    if(this.unitSelected.hasOwnProperty('idunit')){
      this.Kegiatan.title = 'Pilih Kegiatan';
      this.Kegiatan.get(this.unitSelected.idunit, '321');
      this.Kegiatan.showThis = true;
    }
  }
  callBackKegiatan(e: ILookupTree){
    this.kegSelected = e;
    let split_label = this.kegSelected.label.split('-');
    this.uiKeg = {kode: split_label[0], nama: split_label[1]};
    this.dataSelected = null;
    this.getDatas();
  }
  callback(e: any){
    if(e.added || e.edited){
      this.getDatas();
    }
  }
  getDatas(){
    if(this.unitSelected && this.kegSelected){
      this.dataSelected = null;
      if(this.dt) this.dt.reset();
      this.loading = true;
      const params = {
        Idunit: this.unitSelected.idunit,
        Idkeg: this.kegSelected.data_id,
        Kdstatus: this.kdstatus
      }
      this.service.gets(params)
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
    } else {
      this.notif.warning('Pilih SKPD');
    }
  }
  add(){
    if(this.unitSelected.hasOwnProperty('idunit') && this.kegSelected){
      this.Form.forms.patchValue({
        idunit: this.unitSelected.idunit,
        idkeg: this.kegSelected.data_id,
        kdstatus: this.kdstatus
      });
      this.Form.title = 'Tambah Data';
      this.Form.mode = 'add';
      this.Form.showThis = true;
    }
  }
  update(e: any){
    this.Form.forms.patchValue({
      idspjapbd: e.idspjapbd,
      idunit: e.idunit,
      idkeg: e.idkeg,
      nospj: e.nospj,
      kdstatus:e.kdstatus,
      tglspj: e.tglspj != null ? new Date(e.tglspj) : new Date(),
      keterangan: e.keterangan
    });
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  dataKlick(e: any){
    this.dataSelected = e;
  }
  delete(e: any){
    this.notif.confir({
      message: `${e.nospj} Akan Dihapus`,
      accept: () => {
        this.service.delete(e.idspjapbd).subscribe(
          (resp) => {
            if (resp.ok) {
              this.getDatas();
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
  ngOnDestroy(): void {
    this.listdata = [];
    this.uiUnit = { kode: '', nama: '' };
    this.uiKeg = { kode: '', nama: '' };
    this.unitSelected = null;
    this.kegSelected = null;
    this.dataSelected = null;
  }
}
