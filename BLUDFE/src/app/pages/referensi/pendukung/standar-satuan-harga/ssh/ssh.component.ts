import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SshService } from 'src/app/core/services/ssh.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { SshFormComponent } from './ssh-form/ssh-form.component';

@Component({
  selector: 'app-ssh',
  templateUrl: './ssh.component.html',
  styleUrls: ['./ssh.component.scss']
})
export class SshComponent implements OnInit, OnDestroy {
  title: string = '';
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  totalRecords: number = 0;
  dataSelected: any = null;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(SshFormComponent, {static: true}) form: SshFormComponent;
  constructor(
    private auth: AuthenticationService,
    private service: SshService,
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
    this.service._kelompok = "1";
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
  dataClick(e: any){
    this.dataSelected = e;
  }
  callback(e: any){
    if(e.added || e.edited){
      if(this.dt) this.dt.reset();
    }
  }
  add(){
    this.form.title = 'Tambah Data';
    this.form.mode = 'add';
    this.form.showThis = true;
  }
  edit(e: any){
    this.form.title = 'Ubah Data';
    this.form.mode = 'edit';
    this.form.forms.patchValue({
      idssh: e.idssh,
      idbrg: e.idbrg,
      kdssh: e.kdssh,
      kode: e.kode,
      uraian: e.uraian,
      spek: e.spek,
      satuan: e.satuan,
      kdsatuan: e.kdsatuan,
      harga: e.harga,
      kelompok: e.kelompok
    });
    if(e.kdsatuanNavigation){
      this.form.uiSatuan.nama = e.kdsatuanNavigation.uraisatuan;
    }
    if(e.idbrgNavigation){
      this.form.uiBarang = {nama: e.idbrgNavigation.nmbrg, kode: e.idbrgNavigation.kdbrg};
    }
    this.form.showThis = true;
  }
  delete(e: any){
    this.notif.confir({
    	message: `${e.uraian} Akan Dihapus ?`,
    	accept: () => {
    		this.service.delete(e.idssh).subscribe(
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
