import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ISpp} from 'src/app/core/interface/ispp';
import {ISppdetr} from 'src/app/core/interface/isppdetr';
import {Subscription} from 'rxjs';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {SppdetrService} from 'src/app/core/services/sppdetr.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {SppdetrpotService} from 'src/app/core/services/sppdetrpot.service';
import {
  SppLsPegawaiPotonganFormComponent
} from 'src/app/pages/bendahara-pengeluaran/spp/spp-ls-pegawai/spp-ls-pegawai-potongan-form/spp-ls-pegawai-potongan-form.component';

@Component({
  selector: 'app-spp-ls-pegawai-potongan',
  templateUrl: './spp-ls-pegawai-potongan.component.html',
  styleUrls: ['./spp-ls-pegawai-potongan.component.scss']
})
export class SppLsPegawaiPotonganComponent implements OnInit, OnDestroy {
  @Input() SppSelected : ISpp;
  tabIndex: number = 0;
  rekeningSelected: ISppdetr;
  subRekeing: Subscription;
  listdata: any[] = [];
  dataSelected: any;
  loading: boolean;
  userInfo: ITokenClaim;
  @ViewChild(SppLsPegawaiPotonganFormComponent,{static: true}) Form : SppLsPegawaiPotonganFormComponent;
  @ViewChild('dt', {static: false}) dt: any;
  constructor(
    private sppdetrService: SppdetrService,
    private service: SppdetrpotService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.subRekeing = this.sppdetrService._dataSelected.subscribe(resp => {
      this.rekeningSelected = resp;
      this.get();
    });
  }

  ngOnInit() {
  }
  get(){
    if(this.rekeningSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.rekeningSelected.idsppdetr)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = resp;
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
        }, (error) => {
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
  onChangeTab(e: any){
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex((f: any) => f.idsppdetrpot === e.data.idsppdetrpot);
      this.listdata = this.listdata.filter(f => f.idsppdetrpot != e.data.idsppdetrpot);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  add(){
    if(this.rekeningSelected){
      this.Form.title = 'Tambah Potongan';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idsppdetr: this.rekeningSelected.idsppdetr
      });
      this.Form.showThis = true;
    }
  }
  update(e: any){
    this.Form.title = 'Ubah Potongan';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idsppdetrpot :  e.idsppdetrpot,
      idsppdetr :  e.idsppdetr,
      idpot :  e.idpot,
      nilai :  e.nilai,
      keterangan :  e.keterangan
    });
    if(e.idpotNavigation){
      this.Form.uiPotongan = {kode : e.idpotNavigation.kdpot, nama: e.idpotNavigation.nmpot};
      this.Form.potonganSelected = e.idpotNavigation;
    }
    this.Form.isvalid = this.SppSelected.valid;
    this.Form.showThis = true;
  }
  delete(e: any){
    this.notif.confir({
      message: ``,
      accept: () => {
        this.service.delete(e.idsppdetrpot).subscribe(
          (resp) => {
            if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idsppdetrpot !== e.idsppdetrpot);
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
  ngOnDestroy(): void {
    this.listdata = [];
    this.subRekeing.unsubscribe();
  }
}
