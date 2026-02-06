import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IDisplayGlobal, ILookupTree} from 'src/app/core/interface/iglobal';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {ITagihan} from 'src/app/core/interface/itagihan';
import {LookDaftunitDpaComponent} from 'src/app/shared/lookups/look-daftunit-dpa/look-daftunit-dpa.component';
import {LookDpakegiatanComponent} from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import {
  TagihanPembuatanFormComponent
} from 'src/app/pages/bendahara-pengeluaran/manajemen-proyek/tagihan/tagihan-pembuatan/tagihan-pembuatan-form/tagihan-pembuatan-form.component';
import {Subscription} from 'rxjs';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {TagihanService} from 'src/app/core/services/tagihan.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-tagihan-bast',
  templateUrl: './tagihan-bast.component.html',
  styleUrls: ['./tagihan-bast.component.scss']
})
export class TagihanBastComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: ITagihan[] = [];
  dataSelected: ITagihan = null;
  @ViewChild(LookDaftunitDpaComponent, {static: true}) Daftunit : LookDaftunitDpaComponent;
  @ViewChild(LookDpakegiatanComponent, {static: true}) Kegiatan : LookDpakegiatanComponent;
  @ViewChild('dt',{static:false}) dt: any;
  sub_tagihan: Subscription;
  indexSubs : Subscription;
  kdstatus: string = '71,79';
  constructor(
    private auth: AuthenticationService,
    private service: TagihanService,
    private notif: NotifService,
    private unitService: DaftunitService,
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiKeg = {kode: '', nama: ''};
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
    /*this.sub_tagihan = this.service._tagihanSelected.subscribe(resp => this.dataSelected = resp);
    this.indexSubs = this.service._tabIndex.subscribe(resp => {
      if(resp === 0){
        this.uiUnit = { kode: '', nama: '' };
        this.uiKeg = { kode: '', nama: '' };
        this.dataSelected = null;
        this.unitSelected = null;
        this.kegSelected = null;
        this.listdata = [];
      }
    });*/
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
    this.service.setTagihanSelected(null);
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
    this.service.setTagihanSelected(null);
    this.getDatas();
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idtagihan === e.data.idtagihan);
      this.listdata = this.listdata.filter(f => f.idtagihan != e.data.idtagihan);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  getDatas(){
    if(this.unitSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      const params = {
        'Idunit': this.unitSelected.idunit,
        'Idkeg': this.kegSelected.data_id,
        'Kdstatus': this.kdstatus
      };
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
  dataKlick(e: ITagihan){
    this.dataSelected = e;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.uiUnit = { kode: '', nama: '' };
    this.uiKeg = { kode: '', nama: '' };
    this.unitSelected = null;
    this.kegSelected = null;
    //this.service.setTagihanSelected(null);
    //this.indexSubs.unsubscribe();
  }
}
