import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {ITahap} from 'src/app/core/interface/itahap';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {TahapService} from 'src/app/core/services/tahap.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {LazyLoadEvent} from 'primeng/api';
import {TahapanFormComponent} from 'src/app/pages/referensi/penunjang/tahapan/tahapan-form/tahapan-form.component';

@Component({
  selector: 'app-tahapan',
  templateUrl: './tahapan.component.html',
  styleUrls: ['./tahapan.component.scss']
})
export class TahapanComponent implements OnInit, OnDestroy {
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: ITahap[] = [];
  @ViewChild('dt',{static:false}) dt: any;
  totalRecords: number = 0;
  @ViewChild(TahapanFormComponent, {static: true}) Form: TahapanFormComponent;
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
    if(e.added || e.edited){
      if(this.dt) this.dt.reset();
    }
  }
  gets(event: LazyLoadEvent){
    if(this.loading){
      this.loading = true;
    }
    this.listdata = [];
    this.totalRecords = 0;
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
      ket : e.ket,
    });
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ITahap) {
    this.notif.confir({
      message: `${e.uraian} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.kdtahap.trim()).subscribe(
          (resp) => {
            if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.kdtahap.trim() !== e.kdtahap.trim());
              this.notif.success('Data berhasil dihapus');
              this.dt.reset();
            }
          }, (error) => {
            if (Array.isArray(error.error.error)) {
              for (var i = 0; i < error.error.error.length; i++) {
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
    this.totalRecords = 0;
  }
}
