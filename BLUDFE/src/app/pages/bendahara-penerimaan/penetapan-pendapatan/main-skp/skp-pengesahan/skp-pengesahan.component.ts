import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {Subscription} from 'rxjs';
import {ISkp} from 'src/app/core/interface/iskp';
import {LookDaftunitComponent} from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {SkpService} from 'src/app/core/services/skp.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {
  SkpFormPengesahanComponent
} from 'src/app/pages/bendahara-penerimaan/penetapan-pendapatan/main-skp/skp-pengesahan/skp-form-pengesahan/skp-form-pengesahan.component';

@Component({
  selector: 'app-skp-pengesahan',
  templateUrl: './skp-pengesahan.component.html',
  styleUrls: ['./skp-pengesahan.component.scss']
})
export class SkpPengesahanComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  indexSubs : Subscription;
  listdata: ISkp[] = [];
  dataSelected: ISkp = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(SkpFormPengesahanComponent, {static: true}) Form: SkpFormPengesahanComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private auth: AuthenticationService,
    private service: SkpService,
    private notif: NotifService,
    private unitService: DaftunitService
      ) {
        this.userInfo = this.auth.getTokenInfo();
        this.uiUnit = {kode: '', nama: ''};
        this.indexSubs = this.service._tabIndex.subscribe(resp => {
          if(resp === 0){
          }
        });
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
    this.dataSelected = null;
    this.listdata = [];
    this.get();
  }
  get(){
    this.dataSelected = null;
    this.listdata = [];
    if(this.unitSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.unitSelected.idunit, 0, '70,76', 1)
        .subscribe(resp => {
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
      this.notif.warning('Pilih Unit Organisasi dan Bendahara');
    }
  }
  callback(e: any){
    if(e.added || e.edited){
      this.get();
    }
    this.dataSelected = null;
  }
  dataKlick(e: ISkp){
    if(this.unitSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Unit & Bendahara');
    }
  }
  update(e: ISkp){
    this.Form.forms.patchValue({
      idskp : e.idskp,
      idunit : e.idunit,
      noskp : e.noskp,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idxkode : e.idxkode,
      tglskp : e.tglskp ? new Date(e.tglskp) : null,
      penyetor: e.penyetor,
      alamat: e.alamat,
      idphk3: e.idphk3,
      uraiskp : e.uraiskp,
      tgltempo : e.tgltempo ? new Date(e.tgltempo) : null,
      tglvalid : e.tglvalid ? new Date(e.tglvalid) : null,
      valid: e.valid
    });
    this.Form.unitSelected = this.unitSelected;
    if(e.idphk3Navigation){
      this.Form.phk3Selected = e.idphk3Navigation;
      this.Form.uiPhk3 = {
        kode: e.idphk3Navigation.nmphk3, nama: e.idphk3Navigation.nminst
      }
    }
    if(e.idbendNavigation){
      this.Form.bendSelected = e.idbendNavigation;
      this.Form.uiBend = {
        kode: e.idbendNavigation.idpegNavigation.nip,
        nama: e.idbendNavigation.idpegNavigation.nama + ',' + e.idbendNavigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbendNavigation.jnsbendNavigation.uraibend.trim()
      };
    }
    this.Form.title = 'Pengesahan SKP';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISkp){
    let postBody = {
      idskp : e.idskp,
      idunit : e.idunit,
      noskp : e.noskp,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idxkode : e.idxkode,
      tglskp : e.tglskp ? new Date(e.tglskp) : null,
      penyetor: e.penyetor,
      alamat: e.alamat,
      idphk3: e.idphk3,
      uraiskp : e.uraiskp,
      tgltempo : e.tgltempo ? new Date(e.tgltempo) : null,
      tglvalid : null,
      valid: null
    }
    this.notif.confir({
      message: `Batalkan Pengesahan Untuk No SKP : ${e.noskp} ?`,
      accept: () => {
        this.service.pengesahan(postBody).subscribe(
          (resp) => {
            if (resp.ok) {
              this.notif.success('Pengesahan berhasil dibatalkan');
              this.dataSelected = null;
              this.get();
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
  print(data: ISkp){}
  ngOnDestroy():void {
    this.listdata = [];
    this.uiUnit = { kode: '', nama: '' };
    this.unitSelected = null;
    this.dataSelected = null;
    this.indexSubs.unsubscribe();
  }
}
