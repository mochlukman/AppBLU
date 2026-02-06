import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBkpajak } from 'src/app/core/interface/ibkpajak';
import { IBkpajakdetstr } from 'src/app/core/interface/ibkpajakdetstr';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BkpajakdetstrService } from 'src/app/core/services/bkpajakdetstr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { TabPajakTunaiDetailRincianFormComponent } from '../tab-pajak-tunai-detail-rincian-form/tab-pajak-tunai-detail-rincian-form.component';

@Component({
  selector: 'app-tab-pajak-tunai-detail-rincian',
  templateUrl: './tab-pajak-tunai-detail-rincian.component.html',
  styleUrls: ['./tab-pajak-tunai-detail-rincian.component.scss']
})
export class TabPajakTunaiDetailRincianComponent implements OnInit, OnDestroy, OnChanges {
  loading: boolean;
  listdata: IBkpajakdetstr[] = [];
  @Input() bkpajakSelected : IBkpajak;
  userInfo: ITokenClaim;
  @ViewChild(TabPajakTunaiDetailRincianFormComponent, {static: true}) Form : TabPajakTunaiDetailRincianFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : Subscription;
  dataSelected: IBkpajakdetstr;
  constructor(
    private service: BkpajakdetstrService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.indexSubs = this.service._tabIndex.subscribe(resp => {
      if(resp == 0){

      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.bkpajakSelected;
    this.get();
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idbkpajakdetstr === e.data.idbkpajakdetstr);
      this.listdata = this.listdata.filter(f => f.idbkpajakdetstr != e.data.idbkpajakdetstr);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.bkpajakSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.bkpajakSelected.idbkpajak)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          
          this.loading = false;
          this.dataSelected = null;
        },(error) => {
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
  add(){
    this.Form.title = 'Tambah Rincian Pajak';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idbkpajak : this.bkpajakSelected.idbkpajak
    });
    this.Form.showThis = true;
  }
  update(e: IBkpajakdetstr){
    this.Form.forms.patchValue({
      idbkpajakdetstr : e.idbkpajakdetstr,
      idpajak : e.idpajak,
      idbkpajak : e.idbkpajak,
      idbilling : e.idbilling,
      tglidbilling : e.tglidbilling != null ? new Date(e.tglidbilling) : null,
      tglexpire : e.tglexpire != null ? new Date(e.tglexpire) : null,
      ntpn : e.ntpn,
      ntb : e.ntb
    });
    if(e.idpajakNavigation){
      this.Form.uiPajak = {kode: e.idpajakNavigation.kdpajak, nama: e.idpajakNavigation.nmpajak};
    }
    this.Form.title = 'Ubah Rincian Pajak';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IBkpajakdetstr){
    this.notif.confir({
			message: `${e.idpajakNavigation.nmpajak} Akan Dihapus`,
			accept: () => {
				this.service.delete(e.idbkpajakdetstr).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idbkpajakdetstr !== e.idbkpajakdetstr);
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
  dataKlick(e: IBkpajakdetstr){
    this.dataSelected = e;
	}
  ngOnDestroy(): void {
    this.listdata = [];
    this.bkpajakSelected = null;
    this.indexSubs.unsubscribe();
  }
}
