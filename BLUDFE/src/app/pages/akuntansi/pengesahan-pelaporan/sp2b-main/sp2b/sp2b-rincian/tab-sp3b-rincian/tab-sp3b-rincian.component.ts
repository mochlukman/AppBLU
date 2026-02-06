import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {Sp2bdetService} from 'src/app/core/services/sp2bdet.service';
import {LookSp3bComponent} from 'src/app/shared/lookups/look-sp3b/look-sp3b.component';
import { PopupLoadingComponent } from 'src/app/shared/Component/popup-loading/popup-loading.component';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-tab-sp3b-rincian',
  templateUrl: './tab-sp3b-rincian.component.html',
  styleUrls: ['./tab-sp3b-rincian.component.scss']
})
export class TabSp3bRincianComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rootSelected : any;
  loading: boolean;
  listdata: any[] = [];
  userInfo: ITokenClaim;
  @ViewChild(LookSp3bComponent, { static: true }) lookSp3bComponent: LookSp3bComponent;
  constructor(
    private auth: AuthenticationService,
    private service: Sp2bdetService,
    private notif: NotifService,
    public dialog: DialogService,
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.rootSelected;
    this.gets();
  }
  gets(){
    this.loading = true;
    this.listdata = [];
    const params = {
      Idsp2b: this.rootSelected.idsp2b
    };
    this.service.rincianSP3B(params).subscribe(resp => {
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
  add(){
    this.lookSp3bComponent.gets({idunit: this.rootSelected.idunit, forSp2b: true});
    this.lookSp3bComponent.title = 'Pilih Data SP3B';
    this.lookSp3bComponent.showThis = true;
  }
  callBackLook(e: any){
    if(e){
      const params = {
        idsp2b: this.rootSelected.idsp2b,
        idsp3b: e.idsp3b
      };
      const overlay = this.dialog.open(PopupLoadingComponent, {
        data: {
          message: 'Menyimpan Data'
        }
      });
      this.service.post(params).subscribe((resp) => {
        if (resp.ok) {
          this.gets();
          this.notif.success('Input Data Berhasil');
        }
        overlay.close(true);
      }, (error) => {
        overlay.close(true);
        if(Array.isArray(error.error.error)){
          for(let i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
  }
  delete(e: any) {
    this.notif.confir({
      message: `${e.nosp3b} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.idsp2bdet).subscribe(
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

