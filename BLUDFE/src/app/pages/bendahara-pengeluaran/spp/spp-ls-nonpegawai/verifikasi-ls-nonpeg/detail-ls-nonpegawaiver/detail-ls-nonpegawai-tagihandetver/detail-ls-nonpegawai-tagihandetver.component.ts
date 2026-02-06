import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ITagihan, ITagihandet} from 'src/app/core/interface/itagihan';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {Subscription} from 'rxjs';
import {
  TagihanPembuatanDetailFormComponent
} from 'src/app/pages/bendahara-pengeluaran/manajemen-proyek/tagihan/tagihan-pembuatan/tagihan-pembuatan-detail/tagihan-pembuatan-detail-form/tagihan-pembuatan-detail-form.component';
import {TagihandetService} from 'src/app/core/services/tagihandet.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-detail-ls-nonpegawai-tagihandetver',
  templateUrl: './detail-ls-nonpegawai-tagihandetver.component.html',
  styleUrls: ['./detail-ls-nonpegawai-tagihandetver.component.scss']
})
export class DetailLsNonpegawaiTagihandetverComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: ITagihandet[] = [];
  dataSelected : ITagihandet = null;
  userInfo: ITokenClaim;
  @Input() tagihanSelected: ITagihan;
  sub_tagihan: Subscription;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(TagihanPembuatanDetailFormComponent,{static: true}) Form : TagihanPembuatanDetailFormComponent;
  constructor(
    private service: TagihandetService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.tagihanSelected;
    this.get();
  }
  get(){
    if(this.tagihanSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.tagihanSelected.idtagihan)
        .subscribe(resp => {
          if(resp.length){
            this.listdata = [...resp]
          } else {
            this.notif.info('Data Rekening Tidak Tersedia');
          }
          this.loading = false;
        }, error => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    } else {
      this.listdata = [];
    }
  }
  totalNilai(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += f.nilai);
    }
    return total;
  }
  ngOnDestroy() : void {
    this.dataSelected = null;
    this.listdata = [];
  }
}
