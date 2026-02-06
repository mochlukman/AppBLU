import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IBpkpajak} from 'src/app/core/interface/ibpkpajak';
import {IBpk} from 'src/app/core/interface/ibpk';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {BpkpajakService} from 'src/app/core/services/bpkpajak.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {
  PengesahanBpkPungutanPajakDetComponent
} from 'src/app/pages/bendahara-dana-bok/bpk/bpk/pengesahan-bpk/pengesahan-bpk-rincian/pengesahan-bpk-pungutan-pajak/pengesahan-bpk-pungutan-pajak-det/pengesahan-bpk-pungutan-pajak-det.component';

@Component({
  selector: 'app-pengesahan-bpk-pungutan-pajak',
  templateUrl: './pengesahan-bpk-pungutan-pajak.component.html',
  styleUrls: ['./pengesahan-bpk-pungutan-pajak.component.scss']
})
export class PengesahanBpkPungutanPajakComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0
  loading: boolean;
  listdata: IBpkpajak[] = [];
  @Input() bpkSelected : IBpk;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: IBpkpajak;
  kdtatus: string = '35';
  @ViewChild(PengesahanBpkPungutanPajakDetComponent, {static: true}) Bpkdet: PengesahanBpkPungutanPajakDetComponent;
  constructor(
    private service: BpkpajakService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bpkSelected) {
      if (changes.bpkSelected.firstChange && changes.bpkSelected.currentValue) {
        if(this.tabIndex == 1){
          this.gets();
        } else {
          this.ngOnDestroy();
        }

      } else {
        if (changes.bpkSelected.currentValue != changes.bpkSelected.previousValue) {
          if(this.tabIndex == 1){
            this.gets();
          } else {
            this.ngOnDestroy();
          }
        }
      }
    } else if(this.tabIndex == 1){
      this.gets();
    }
  }
  ngOnInit() {
  }
  gets(){
    if(this.bpkSelected && this.tabIndex == 1){
      this.loading = true;
      this.listdata = [];
      this.dataSelected = null;
      this.service._idbpk = this.bpkSelected.idbpk;
      this.service._kdstatus = this.kdtatus;
      this.service.gets().subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
        this.loading = false;
      }, error => {
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
  dataClick(e: IBpkpajak){
    this.dataSelected = e;
    this.Bpkdet.title = `Rincian Pungutan Pajak`;
    this.Bpkdet.BpkpajakSelected = this.dataSelected;
    this.Bpkdet.showThis = true;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.dataSelected = null;
  }
}
