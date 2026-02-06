import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ISpp} from 'src/app/core/interface/ispp';
import {ILookupTree} from 'src/app/core/interface/iglobal';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {SpptagService} from 'src/app/core/services/spptag.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-detail-ls-nonpegawai-tagihanver',
  templateUrl: './detail-ls-nonpegawai-tagihanver.component.html',
  styleUrls: ['./detail-ls-nonpegawai-tagihanver.component.scss']
})
export class DetailLsNonpegawaiTagihanverComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: any[] = [];
  @Input() SppSelected: ISpp;
  @Input() KegSelected: ILookupTree;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static: false}) dt: any;
  dataSelected: any;

  constructor(
    private service: SpptagService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.KegSelected;
    this.SppSelected;
    if (this.tabIndex == 1) {
      this.get();
    } else {
      this.listdata = [];
    }
  }

  ngOnInit() {
  }

  callback(e: any) {
    if (e.added) {
      this.get();
    }
  }

  get() {
    if (this.SppSelected) {
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.SppSelected.idspp)
        .subscribe(resp => {
          this.listdata = [...resp];
          this.loading = false;
          this.dataSelected = null;
        }, (error) => {
          this.loading = false;
          if (Array.isArray(error.error.error)) {
            for (var i = 0; i < error.error.error.length; i++) {
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    }
  }
  dataKlick(e: any) {
    this.dataSelected = e;
  }
  subTotal(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.SppSelected = null;
    this.KegSelected = null;
    this.dataSelected = null;
  }
}
