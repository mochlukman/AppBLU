import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { IRkab } from 'src/app/core/interface/irkab';
import { IRkadetb } from 'src/app/core/interface/irkadetb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { RkadetbService } from 'src/app/core/services/rkadetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { TapddetbComponent } from '../tapddetb/tapddetb.component';

@Component({
  selector: 'app-rkadetb',
  templateUrl: './rkadetb.component.html',
  styleUrls: ['./rkadetb.component.scss']
})
export class RkadetbComponent implements OnInit, OnDestroy {
  loading: boolean;
  listdata: IRkadetb[] = [];
  userInfo: ITokenClaim;
  totalRecords: number;
  @Input() rkaSelected: IRkab;
  @ViewChild('dt', { static: false }) dt: any;
  @ViewChild(TapddetbComponent, {static: true}) Tapddet: TapddetbComponent;
  @Output() callbackChild = new EventEmitter();
  totalNilai: number = 0;
  constructor(
    private service: RkadetbService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rkaSelected) {
      if (changes.rkaSelected.firstChange && changes.rkaSelected.currentValue) {
        if (this.dt) this.dt.reset();
      } else {
        if (changes.rkaSelected.currentValue != changes.rkaSelected.previousValue) {
          if (this.dt) this.dt.reset();
        }
      }
    }
  }

  ngOnInit() {
  }
  gets(event: LazyLoadEvent) {
    if (this.rkaSelected) {
      if (this.loading) this.loading = true;
      this.listdata = [];
      this.totalNilai = 0;
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idrkab = this.rkaSelected.idrkab;
      this.service.paging().subscribe(resp => {
        if (resp.totalrecords > 0) {
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
          if (resp.optionalResult) {
            this.totalNilai = resp.optionalResult.totalNilai;
          }
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
  subTotal(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => {
        if(f.type.trim() == 'D'){
          total += +f.subtotal;
        }
      });
		}
		return total;
  }
  listVerifikasi(e: IRkadetb){
    this.Tapddet.rkadetSelected = e;
    this.Tapddet.title = "Verifikasi TAPD";
    this.Tapddet.idunit = this.rkaSelected.idunit;
    this.Tapddet.showThis = true;
  }
  ngOnDestroy(): void {
    this.totalNilai = 0;
    this.listdata = [];
    this.rkaSelected = null;
  }
}