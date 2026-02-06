import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IDaftrekening} from 'src/app/core/interface/idaftrekening';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {MappingKdpService} from 'src/app/core/services/mapping-kdp.service';
import {KdpFormComponent} from 'src/app/pages/referensi/mapping/kdp/kdp-form/kdp-form.component';

@Component({
  selector: 'app-kdp-aset-tetap-rincian',
  templateUrl: './kdp-aset-tetap-rincian.component.html',
  styleUrls: ['./kdp-aset-tetap-rincian.component.scss']
})
export class KdpAsetTetapRincianComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dataselected: IDaftrekening | null;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  @ViewChild('dt', {static:false}) dt: any;
  @ViewChild(KdpFormComponent, {static: true}) form: KdpFormComponent;
  constructor(
    private service: MappingKdpService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.gets();
  }
  gets(){
    if(this.dataselected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.dataselected.idrek).subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
        this.loading = false;
      }, (error) => {
        this.loading = false;
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
  }
  add(){
    this.form.title = 'Pilih Rekening Belanja Modal';
    this.form.idrekkdp = this.dataselected.idrek;
    let idrekExist:any[] = [];
    if(this.listdata.length > 0){
      this.listdata.forEach(f => idrekExist.push(f.idrekbmNavigation.idrek));
      this.form.listExist = idrekExist;
    }
    this.form.showThis = true;
  }
  callback(e: any){
    if(e.added){
      this.gets();
    }
  }
  delete(e: any){
    this.notif.confir({
      message: `${e.idrekbmNavigation.nmper} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.idsetkdp).subscribe(
          (resp) => {
            if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              this.listdata = this.listdata.filter(f => f.idsetkdp !== e.idsetkdp);
              this.listdata.sort((a,b) =>  (a.kdper.trim() > b.kdper.trim() ? 1 : -1));
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
  ngOnDestroy(): void {
    this.listdata = [];
  }
}
