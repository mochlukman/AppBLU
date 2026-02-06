import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {IBpkpajakstrdet} from 'src/app/core/interface/ibpkpajakstrdet';
import {IBpkpajakstr} from 'src/app/core/interface/ibpkpajakstr';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {BpkpajakstrdetService} from 'src/app/core/services/bpkpajakstrdet.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {
  PengesahanBpkPungutanPajakDetComponent
} from 'src/app/pages/bendahara-dana-bok/bpk/bpk/pengesahan-bpk/pengesahan-bpk-rincian/pengesahan-bpk-pungutan-pajak/pengesahan-bpk-pungutan-pajak-det/pengesahan-bpk-pungutan-pajak-det.component';

@Component({
  selector: 'app-penyetoran-pajak-rincian-detail-sah',
  templateUrl: './penyetoran-pajak-rincian-detail-sah.component.html',
  styleUrls: ['./penyetoran-pajak-rincian-detail-sah.component.scss']
})
export class PenyetoranPajakRincianDetailSahComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0
  loading: boolean;
  listdata: IBpkpajakstrdet[] = [];
  totalRecords: number = 0;
  @Input() bpkpajakstrSelected : IBpkpajakstr;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: any;
  @Output() callback = new EventEmitter();
  @ViewChild(PengesahanBpkPungutanPajakDetComponent, {static: true}) Bpkdet: PengesahanBpkPungutanPajakDetComponent;
  constructor(
    private service: BpkpajakstrdetService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 0){
      this.gets();
    } else {
      this.ngOnDestroy();
    }
  }
  ngOnInit() {
  }
  gets(){
    if(this.bpkpajakstrSelected){
      this.loading = true;
      this.listdata = [];
      this.service._idbpkpajakstr = this.bpkpajakstrSelected.idbpkpajakstr;
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
  dataClick(e: any){
    this.dataSelected = e;
    this.Bpkdet.title = `Rincian Pungutan Pajak`;
    this.Bpkdet.BpkpajakSelected = this.dataSelected;
    this.Bpkdet.showThis = true;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.dataSelected = null;
    this.totalRecords = 0;
  }
}

