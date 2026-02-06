import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {Ibend} from 'src/app/core/interface/ibend';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {ITbp} from 'src/app/core/interface/itbp';
import {Subscription} from 'rxjs';
import {LookDaftunitComponent} from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import {LookBendaharaComponent} from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';;
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {TbpService} from 'src/app/core/services/tbp.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import {
  PelbankBpToBpFormSahComponent
} from 'src/app/pages/bendahara-pengeluaran/pelimpahan/pelimpahan-bank/pelbank-bp-to-bp-sah/pelbank-bp-to-bp-form-sah/pelbank-bp-to-bp-form-sah.component';

@Component({
  selector: 'app-pelbank-bp-to-bp-sah',
  templateUrl: './pelbank-bp-to-bp-sah.component.html',
  styleUrls: ['./pelbank-bp-to-bp-sah.component.scss']
})
export class PelbankBpToBpSahComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: ITbp[] = [];
  dataSelected: ITbp = null;
  indexSubs : Subscription;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild(PelbankBpToBpFormSahComponent, {static: true}) Form: PelbankBpToBpFormSahComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private auth: AuthenticationService,
    private service: TbpService,
    private notif: NotifService,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.indexSubs = this.service._tabIndex.subscribe(resp => {
      if(resp === 2){
        // console.log('BP-BP');
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
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
    this.listdata = [];
  }
  lookBendahara(){
    if(this.unitSelected){
      this.Bendahara.title = 'Pilih Bendahara';
      this.Bendahara.gets(this.unitSelected.idunit,'02');
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
    this.get();
  }
  get(){
    this.dataSelected = null;
    this.listdata = [];
    if(this.unitSelected && this.bendSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.unitSelected.idunit,'54', 6, this.bendSelected.idbend)
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
      this.notif.warning('Pilih Unit Organisasi dan Bendaraha');
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idtbp === e.data.idtbp);
      this.listdata = this.listdata.filter(f => f.idtbp != e.data.idtbp);
      this.listdata.splice(index, 0, e.data);
    }
    this.dataSelected = null;
  }
  update(e: ITbp){
    this.Form.forms.patchValue({
      idtbp : e.idtbp,
      idunit : e.idunit,
      idbend1 : e.idbend1,
      notbp : e.notbp,
      kdstatus : e.kdstatus,
      idxkode: e.idxkode,
      tgltbp : e.tgltbp ? new Date(e.tgltbp) : null,
      uraitbp : e.uraitbp,
      alamat : e.alamat,
      penyetor: e.penyetor,
      tglvalid : e.tglvalid ? new Date(e.tglvalid) : null,
      valid: e.valid,
      ketvalid: e.ketvalid
    });
    this.Form.unitSelected = this.unitSelected;
    this.Form.title = 'Pengesahan';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ITbp){
    let postBody = {
      idtbp : e.idtbp,
      idunit : e.idunit,
      idbend1 : e.idbend1,
      notbp : e.notbp,
      kdstatus : e.kdstatus,
      idxkode: e.idxkode,
      tgltbp : e.tgltbp ? new Date(e.tgltbp) : null,
      uraitbp : e.uraitbp,
      alamat : e.alamat,
      penyetor: e.penyetor,
      tglvalid : null,
      valid: null,
      ketvalid: ''
    }
    this.notif.confir({
      message: `Batalkan Pengesahan : ${e.notbp}?`,
      accept: () => {
        this.service.pengesahan(postBody).subscribe(
          (resp) => {
            if (resp.ok) {
              this.get();
              this.notif.success('Pengesahan berhasil dibatalkan');
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
  dataKlick(e: ITbp){
    if(this.unitSelected && this.bendSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Unit & Bendahara');
    }
  }
  print(data: ITbp){}
  ngOnDestroy(): void{
    this.listdata = [];
    this.uiUnit = { kode: '', nama: '' };
    this.unitSelected = null;
    this.dataSelected = null;
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
    this.indexSubs.unsubscribe();
  }
}
