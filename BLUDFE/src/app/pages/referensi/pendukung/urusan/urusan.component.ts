import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { IDafturus } from 'src/app/core/interface/idafturus';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DafturusService } from 'src/app/core/services/dafturus.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { UrusanFormComponent } from './urusan-form/urusan-form.component';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-urusan',
  templateUrl: './urusan.component.html',
  styleUrls: ['./urusan.component.scss']
})
export class UrusanComponent implements OnInit, OnDestroy {
  title: string = '';
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IDafturus[] = [];
  dataSelected: IDafturus = null;
  @ViewChild('dt',{static:false}) dt: any;
  totalRecords: number = 0;
  @ViewChild(UrusanFormComponent, {static: true}) Form : UrusanFormComponent;
  constructor(
    private auth: AuthenticationService,
    private service: DafturusService,
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
  update(e: IDafturus){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idurus : e.idurus,
      kdurus : e.kdurus.trim(),
      nmurus : e.nmurus.trim(),
      kdlevel : e.kdlevel,
      type : e.type.trim(),
      akrounit : e.akrounit,
      alamat : e.alamat,
      telepon : e.telepon,
      staktif : e.staktif,
    });
    this.Form.showThis = true;
  }
  callback(e : any){
    if(e.edited){
      this.listdata.map(m => {
        if(m.idurus == e.data.idurus){
          m.kdurus = e.data.kdurus,
          m.nmurus = e.data.nmurus,
          m.type = e.data.type
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.listdata = [];
		this.dataSelected = null;
  }
}
