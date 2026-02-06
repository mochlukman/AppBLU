import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { IDp } from 'src/app/core/interface/idp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpService } from 'src/app/core/services/dp.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookSp2dByDpInfoComponent } from 'src/app/shared/lookups/look-sp2d-by-dp-info/look-sp2d-by-dp-info.component';

@Component({
  selector: 'app-pengiriman-daftar-penguji',
  templateUrl: './pengiriman-daftar-penguji.component.html',
  styleUrls: ['./pengiriman-daftar-penguji.component.scss']
})
export class PengirimanDaftarPengujiComponent implements OnInit, OnDestroy {
  initialForm: any;
  userInfo: ITokenClaim;
  dataselected: IDp;
  listdata: any[] = [];
  totalRecords: number;
  loading: boolean;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(LookSp2dByDpInfoComponent, {static: true}) SP2D : LookSp2dByDpInfoComponent;
  constructor(
    private service: DpService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {

  }
  gets(event: LazyLoadEvent){
    if(this.loading) this.loading = true;
    this.service._start = event.first;
    this.service._rows = event.rows;
    this.service._globalFilter = event.globalFilter;
    this.service._sortField = event.sortField;
    this.service._sortOrder = event.sortOrder;
    this.service.gets().subscribe(resp => {
      this.totalRecords = resp.totalrecords;
      this.listdata = resp.data;
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
    if(e.added || e.edited){
      if(this.dt) this.dt.reset();
    }
  }
  kirim(e: IDp){
    this.notif.confir({
			message: `Dikirm ${e.nodp} - ${e.uraian}?`,
			accept: () => {
				this.service.kirim(e.iddp).subscribe(
					(resp) => {
						// if (resp.ok) {
            //   this.notif.success('Data berhasil dihapus');
            //   if(this.dt) this.dt.reset();
						// }
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
  infosp2d(e: IDp){
    this.SP2D.title = 'Informasi Data SP2D';
    this.SP2D._iddp = e.iddp;
    this.SP2D.showThis = true;
  }
  print(e : IDp){}
  ngOnDestroy(){
    this.dataselected = null;
  }
}

