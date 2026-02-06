import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { ISppdetr } from 'src/app/core/interface/isppdetr';
import { ISppdetrp } from 'src/app/core/interface/isppdetrp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { SppdetrpService } from 'src/app/core/services/sppdetrp.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import {
  Sp2dLsNonpegawaiPajakFormComponent
} from 'src/app/pages/bud/sp2d/sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-pajak-form/sp2d-ls-nonpegawai-pajak-form.component';
import {ISp2d} from 'src/app/core/interface/isp2d';

@Component({
  selector: 'app-sp2d-ls-nonpegawai-pajak',
  templateUrl: './sp2d-ls-nonpegawai-pajak.component.html',
  styleUrls: ['./sp2d-ls-nonpegawai-pajak.component.scss']
})
export class Sp2dLsNonpegawaiPajakComponent implements OnInit, OnDestroy, OnChanges {
  @Input() Sp2dSelected : ISp2d;
  tabIndex: number = 0;
  rekeningSelected: ISppdetr;
  subRekeing: Subscription;
  listdata: ISppdetrp[] = [];
  dataSelected: ISppdetrp;
  loading: boolean;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static: false}) dt: any;
  @ViewChild(Sp2dLsNonpegawaiPajakFormComponent,{static: true}) Form : Sp2dLsNonpegawaiPajakFormComponent;
  constructor(
    private sppdetrService: SppdetrService,
    private service: SppdetrpService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.subRekeing = this.sppdetrService._dataSelected.subscribe(resp => {
      this.rekeningSelected = resp;
      this.get();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.Sp2dSelected;
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
      let index = this.listdata.findIndex(f => f.idsppdetrp === e.data.idsppdetrp);
      this.listdata = this.listdata.filter(f => f.idsppdetrp != e.data.idsppdetrp);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  subTotal(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  update(e: ISppdetrp){
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idsppdetrp :  e.idsppdetrp,
      idsppdetr :  e.idsppdetr,
      idpajak :  e.idpajak,
      nilai :  e.nilai,
      keterangan :  e.keterangan,
      idbilling :  e.idbilling,
      tglbilling :  e.tglbilling !== null ? new Date(e.tglbilling) : new Date(),
      ntpn :  e.ntpn,
      ntb :  e.ntb,
    });
    if(e.idpajakNavigation){
      this.Form.uiPajak = {kode : e.idpajakNavigation.kdpajak, nama: e.idpajakNavigation.nmpajak};
      this.Form.pajakSelected = e.idpajakNavigation;
    }
    this.Form.showThis = true;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.subRekeing.unsubscribe();
  }
}
