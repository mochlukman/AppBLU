import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Ikegunit } from 'src/app/core/interface/ikegunit';
import { IPgrmunit } from 'src/app/core/interface/ipgrmunit';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { KegunitService } from 'src/app/core/services/kegunit.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { KegDanaxComponent } from '../keg-danax/keg-danax.component';
import { KegUnitFormSubkegxComponent } from '../keg-unit-form-subkegx/keg-unit-form-subkegx.component';
import { KegUnitFormxComponent } from '../keg-unit-formx/keg-unit-formx.component';

@Component({
  selector: 'app-keg-unitx',
  templateUrl: './keg-unitx.component.html',
  styleUrls: ['./keg-unitx.component.scss']
})
export class KegUnitxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() pgrmunitSelected: IPgrmunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: Ikegunit[] = [];
  totalRecords: number;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild(KegUnitFormxComponent, {static: true}) Form : KegUnitFormxComponent;
  @ViewChild(KegUnitFormSubkegxComponent, {static: true}) Formsub : KegUnitFormSubkegxComponent;
  @ViewChild(KegDanaxComponent, {static: true}) SumberDana : KegDanaxComponent;
  @Input() isvalid: boolean = false;
  constructor(
    private service: KegunitService,
    private auth: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added || e.edited){
      if(this.dt) this.dt.reset();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.pgrmunitSelected){
      if(changes.pgrmunitSelected.firstChange){
        if(this.dt) this.dt.reset();
      }else {
        if(changes.pgrmunitSelected.currentValue.idpgrmunit != changes.pgrmunitSelected.previousValue.idpgrmunit){
          if(this.dt) this.dt.reset();
        }
      }
    }
  }
  gets(event: LazyLoadEvent){
    if(this.loading) this.loading = true;
    this.listdata = [];
    this.service._start = event.first;
    this.service._rows = event.rows;
    this.service._globalFilter = event.globalFilter;
    this.service._sortField = event.sortField;
    this.service._sortOrder = event.sortOrder;
    this.service._idpgrmunit = this.pgrmunitSelected.idpgrmunit;
    this.service.paging().subscribe(resp => {
      if(resp.totalrecords > 0){
        this.totalRecords = resp.totalrecords;
        this.listdata = resp.data;
      } else {
        this.notif.info('Data Tidak Tersedia');
      }
      this.loading = false;
    }, error => {
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
  add(){
    this.Form.title = 'Tambah Kegiatan';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idpgrmunit : this.pgrmunitSelected.idpgrmunit
    });
    this.Form._idprgrm =  this.pgrmunitSelected.idprgrm;
    this.Form._idpgrmunit = this.pgrmunitSelected.idpgrmunit;
    this.Form.showThis = true;
  }
  addSub(){
    this.Formsub.title = 'Tambah Sub Kegiatan';
    this.Formsub.mode = 'add';
    this.Formsub.forms.patchValue({
      idpgrmunit : this.pgrmunitSelected.idpgrmunit
    });
    this.Formsub._idprgrm =  this.pgrmunitSelected.idprgrm;
    this.Formsub._idpgrmunit = this.pgrmunitSelected.idpgrmunit;
    this.Formsub.showThis = true;
  }
  edit(e: Ikegunit){
    this.Form.title = 'Ubah Kegiatan';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idkegunit : e.idkegunit,
      idkeg : e.idkeg,
      idpgrmunit : e.idpgrmunit,
      idsifatkeg : e.idsifatkeg,
      target : e.target,
      targetx : e.kegunitx ? e.kegunitx.target : '', 
      sasaran : e.sasaran,
      satuan: e.satuan,
      pagu: e.pagu,
      pagux : e.kegunitx ? e.kegunitx.pagu : 0, 
      ketkeg: e.ketkeg,
    });
    if(e.idkegNavigation){
      this.Form._idprgrm =  e.idkegNavigation.idprgrm;
      this.Form.uiKeg = {kode: e.idkegNavigation.nukeg.trim(), nama: e.idkegNavigation.nmkegunit};
      this.Form.kegSelected = e.idkegNavigation;
    }
    this.Form.showThis = true;
  }
  editsub(e: Ikegunit){
    this.Formsub.title = 'Ubah Sub Kegiatan';
    this.Formsub.mode = 'edit';
    this.Formsub.forms.patchValue({
      idkegunit : e.idkegunit,
      idkeg : e.idkeg,
      idpgrmunit : e.idpgrmunit,
      idsifatkeg : e.idsifatkeg,
      target : e.target,
      targetx : e.kegunitx ? e.kegunitx.target : '',
      sasaran : e.sasaran,
      satuan: e.satuan,
      pagu: e.pagu,
      pagux : e.kegunitx ? e.kegunitx.pagu : 0,
      ketkeg: e.ketkeg,
      pagupls1: e.pagupls1,
      tglawal: e.tglawal ? new Date(e.tglawal) : null,
      tglakhir: e.tglakhir ? new Date(e.tglakhir) : null
    });
    if(e.idkegNavigation){
      this.Formsub._idprgrm =  e.idkegNavigation.idprgrm;
      this.Formsub.uiKeg = {kode: e.idkegNavigation.nukeg.trim(), nama: e.idkegNavigation.nmkegunit};
      this.Formsub.kegSelected = e.idkegNavigation;
    }
    this.Formsub.showThis = true;
  }
  delete(e: Ikegunit){
    this.notif.confir({
			message: `${e.idkegNavigation.nmkegunit} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idkegunit).subscribe(
					(resp) => {
						if (resp.ok) {
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
  getSumberDana(e: Ikegunit){
    this.SumberDana.kegSelected = e;
    this.SumberDana.title = 'Sumber Dana';
    this.SumberDana.showThis = true;
    this.SumberDana.isvalid = this.isvalid;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.pgrmunitSelected = null;
  }
}