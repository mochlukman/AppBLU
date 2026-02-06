import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { IBpk } from 'src/app/core/interface/ibpk';
import { IBpkdetr } from 'src/app/core/interface/ibpkdetr';
import { IDpar } from 'src/app/core/interface/idpar';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkdetrService } from 'src/app/core/services/bpkdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDparByBpkdetrComponent } from 'src/app/shared/lookups/look-dpar-by-bpkdetr/look-dpar-by-bpkdetr.component';
import { PembuatanBpkRincianBelanjaFormComponent } from './pembuatan-bpk-rincian-belanja-form/pembuatan-bpk-rincian-belanja-form.component';

@Component({
  selector: 'app-pembuatan-bpk-rincian-belanja',
  templateUrl: './pembuatan-bpk-rincian-belanja.component.html',
  styleUrls: ['./pembuatan-bpk-rincian-belanja.component.scss']
})
export class PembuatanBpkRincianBelanjaComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0
  loading: boolean;
  listdata: IBpkdetr[] = [];
  totalRecords: number = 0;
  totalNilai: number = 0;
  @Input() bpkSelected : IBpk;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: IBpkdetr;
  @ViewChild(LookDparByBpkdetrComponent, {static: true}) Dpar : LookDparByBpkdetrComponent;
  @ViewChild(PembuatanBpkRincianBelanjaFormComponent, {static: true}) Form: PembuatanBpkRincianBelanjaFormComponent;
  constructor(
    private service: BpkdetrService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bpkSelected) {
      if (changes.bpkSelected.firstChange && changes.bpkSelected.currentValue) {
        if(this.tabIndex == 0){
          if (this.dt) this.dt.reset();
        } else {
          this.ngOnDestroy();
        }

      } else {
        if (changes.bpkSelected.currentValue != changes.bpkSelected.previousValue) {
          if(this.tabIndex == 0){
            if (this.dt) this.dt.reset();
          } else {
            this.ngOnDestroy();
          }
        }
      }
    } else if(this.tabIndex == 0){
      if (this.dt) this.dt.reset();
    }
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added || e.edited){
      if(this.dt) this.dt.reset();
    }
  }
  get(event: LazyLoadEvent){
    if(this.bpkSelected && this.tabIndex == 0){
      if(this.loading) this.loading = true;
      this.listdata = [];
      this.totalRecords = 0;
      this.totalNilai = 0;
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idbpk = this.bpkSelected.idbpk;
      this.service._idkeg = this.bpkSelected.idkeg;
      this.service.paging().subscribe(resp => {
        if (resp.totalrecords > 0) {
          this.totalRecords = resp.totalrecords;
          this.totalNilai = resp.totalNilai;
          this.listdata = resp.data;
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
  add(){
    this.Form.title = 'Tambah';
    this.Form.mode = 'add';
    this.Form.idunit = this.bpkSelected.idunit;
    this.Form.forms.patchValue({
      idkeg: this.bpkSelected.idkeg,
      idbpk: this.bpkSelected.idbpk,
    });
    this.Form.showThis = true;
  }
  update(e: IBpkdetr){
    this.Form.forms.patchValue({
      idbpkdetr : e.idbpkdetr,
      nilai : e.nilai,
      idbpk: this.bpkSelected.idbpk,
      idjdana: e.idjdana,
      idrek: e.idrek
    });
    if(e.idjdanaNavigation){
      this.Form.jdanaSelected = e.idjdanaNavigation;
      this.Form.uiJdana = {kode: e.idjdanaNavigation.kddana, nama: e.idjdanaNavigation.nmdana};
    }
    if(e.idrekNavigation){
      this.Form.rekeningSelected = e.idrekNavigation;
      this.Form.uiRekening = {kode: e.idrekNavigation.kdper.trim(), nama: e.idrekNavigation.nmper.trim()};
    }
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IBpkdetr){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idbpkdetr).subscribe(
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
  ngOnDestroy(): void {
    this.listdata = [];
    this.dataSelected = null;
    this.totalRecords = 0;
    this.totalNilai = 0;
  }
}
