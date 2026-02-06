import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ITahap } from 'src/app/core/interface/itahap';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TahapService } from 'src/app/core/services/tahap.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormJadwalTukdComponent } from './form-jadwal-tukd/form-jadwal-tukd.component';

@Component({
  selector: 'app-jadwal-tukd',
  templateUrl: './jadwal-tukd.component.html',
  styleUrls: ['./jadwal-tukd.component.scss']
})
export class JadwalTukdComponent implements OnInit, OnDestroy {
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: ITahap[] = [];
  dataSelected: ITahap = null;
  @ViewChild('dt',{static:false}) dt: any;
  totalRecords: number = 0;
  @ViewChild(FormJadwalTukdComponent, {static: true}) Form: FormJadwalTukdComponent;
  constructor(
    private auth: AuthenticationService,
    private service: TahapService,
    private notif: NotifService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.kdtahap.trim() === e.data.kdtahap.trim());
      this.listdata = this.listdata.filter(f => f.kdtahap.trim() != e.data.kdtahap.trim());
      this.listdata.splice(index, 0, e.data);
    }
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
  add(){
    this.Form.title = 'Tambah';
    this.Form.mode = 'add';
    this.Form.showThis = true;
  }
  update(e: ITahap){
    this.Form.forms.patchValue({
      kdtahap : e.kdtahap.trim(),
      uraian : e.uraian,
      nmtahap : e.nmtahap,
      startDate : e.startDate !== null ? new Date(e.startDate) : null,
      endDate : e.endDate !== null ? new Date(e.endDate) : null,
      tgltransfer : e.tgltransfer !== null ? new Date(e.tgltransfer) : null,
      ket : e.ket,
    });
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  dataKlick(e: ITahap){
		this.dataSelected = e;
	}
  delete(e: ITahap){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.kdtahap.trim()).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.kdtahap.trim() !== e.kdtahap.trim());
              this.notif.success('Data berhasil dihapus');
              this.dt.reset();
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
  lockTahap(e: ITahap) {
		this.notif.confir({
			message: e.lock ? `Tahap ${e.nmtahap} Akan Dibuka ?` : `Tahap ${e.nmtahap} Akan Dikunci ?`,
			accept: () => {
				this.service.lock(e.kdtahap).subscribe(
					(resp) => {
						if (resp.ok) {
              let resp_data: any = resp.body;
              let index = this.listdata.findIndex(f => f.kdtahap.trim() === resp_data.kdtahap.trim());
              this.listdata = this.listdata.filter(f => f.kdtahap.trim() != resp_data.kdtahap.trim());
              this.listdata.splice(index, 0, resp_data);
							this.notif.success(
								e.lock ? `Tahap ${e.nmtahap} Berhasil Dibuka` : `Tahap ${e.nmtahap} Berhasil Dikunci`
							);
						}
					},
					(error) => {
						if(Array.isArray(error.error.error)){
							for(let i = 0; i < error.error.error.length; i++){
								this.notif.error(error.error.error[i]);
							}
						} else {
							this.notif.error(error.error);
						}
					}
				);
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