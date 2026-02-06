import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { IGolongan } from 'src/app/core/interface/igolongan';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { GolonganService } from 'src/app/core/services/golongan.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-golongan',
  templateUrl: './golongan.component.html',
  styleUrls: ['./golongan.component.scss']
})
export class GolonganComponent implements OnInit, OnDestroy {
  title: string = '';
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IGolongan[] = [];
  dataSelected: IGolongan = null;
  @ViewChild('dt',{static:false}) dt: any;
  totalRecords: number = 0;
  constructor(
    private auth: AuthenticationService,
    private service: GolonganService,
    private notif: NotifService,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(event: LazyLoadEvent){
    if(this.loading){
      this.loading = true;
    }
    this.listdata = [];
    this.service._start = event.first;
    this.service._rows = event.rows;
    this.service._globalFilter = event.globalFilter;
    this.service._sortField = event.sortField;
    this.service._sortOrder = event.sortOrder;
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
  ngOnDestroy(): void {
    this.listdata = [];
		this.dataSelected = null;
  }
}
