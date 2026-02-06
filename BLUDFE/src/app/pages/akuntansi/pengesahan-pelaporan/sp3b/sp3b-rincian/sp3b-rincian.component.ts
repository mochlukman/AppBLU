import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {Sp3bdetService} from 'src/app/core/services/sp3bdet.service';

@Component({
  selector: 'app-sp3b-rincian',
  templateUrl: './sp3b-rincian.component.html',
  styleUrls: ['./sp3b-rincian.component.scss']
})
export class Sp3bRincianComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dataselected : any;
  loading: boolean;
  listdata: any[] = [];
  userInfo: ITokenClaim;
  constructor(
    private auth: AuthenticationService,
    private service: Sp3bdetService,
    private notif: NotifService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataselected;
    this.gets();
  }
  gets(){
    this.loading = true;
    this.listdata = [];
    const params = {
      Idsp3b: this.dataselected.idsp3b
    };
    this.service.gets(params).subscribe(resp => {
      if(resp.length > 0){
        this.listdata = resp;
      } else {
        this.notif.info('Data Tidak Tersedia');
      }
      this.loading = false;
    },(error) => {
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
  delete(e: any) {
    this.notif.confir({
      message: `${e.idrekNavigation.kdper} - ${e.idrekNavigation.nmper} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.idsp3bdet).subscribe(
          (resp) => {
            if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              this.gets();
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
  }
}
