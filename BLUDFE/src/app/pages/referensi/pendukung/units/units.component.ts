import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { UnitsFormComponent } from './units-form/units-form.component';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit, OnDestroy {
  title: string = '';
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IDaftunit[] = [];
  dataSelected: IDaftunit = null;
  @ViewChild('dt',{static:false}) dt: any;
  totalRecords: number = 0;
  @ViewChild(UnitsFormComponent, {static: true}) Form: UnitsFormComponent;
  constructor(
    private auth: AuthenticationService,
    private service: DaftunitService,
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
    this.service._sortField = event.sortField ?  event.sortField : 'kdunit';
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
  callback(e: any){
    if(e.added){
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      this.listdata.map(m => {
        if(m.idunit == e.data.idunit){
          m.akrounit = e.data.akrounit,
          m.alamat = e.data.alamat,
          m.datecreate = e.data.datecreate,
          m.dateupdate = e.data.dateupdate,
          m.idpemda = e.data.idpemda,
          m.idunit = e.data.idunit,
          m.idurus = e.data.idurus,
          m.idurusNavigation = e.data.idurusNavigation,
          m.kdlevel = e.data.kdlevel,
          m.kdlevelNavigation = e.data.kdlevelNavigation,
          m.kdunit = e.data.kdunit,
          m.nmunit = e.data.nmunit,
          m.staktif = e.data.staktif,
          m.telepon = e.data.telepon,
          m.type = e.data.type
        };
      });
    }
  }
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.showThis = true;
  }
  addChild(e: IDaftunit){
    this.Form.title = 'Tambah Sub';
    this.Form.mode = 'addsub';
    this.Form.forms.patchValue({
      kdunit: e.kdunit.trim()+'xx.',
      idurus : e.idurus,
      type: 'D'
    });
    this.Form.showThis = true;
  }
  update(e: IDaftunit){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idunit : e.idunit,
      idpemda : e.idpemda,
      idurus : e.idurus,
      kdunit : e.kdunit.trim(),
      nmunit : e.nmunit.trim(),
      kdlevel : e.kdlevel,
      type : e.type.trim(),
      akrounit : e.akrounit,
      alamat : e.alamat,
      telepon : e.telepon,
      staktif : e.staktif,
    });
    this.Form.showThis = true;
  }
  delete(e: IDaftunit){
    this.notif.confir({
    	message: `${e.nmunit} Akan Dihapus ?`,
    	accept: () => {
    		this.service.delete(e.idunit).subscribe(
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
  }
}
