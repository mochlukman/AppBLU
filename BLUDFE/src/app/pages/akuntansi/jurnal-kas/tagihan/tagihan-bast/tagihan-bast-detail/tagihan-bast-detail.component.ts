import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ITagihan, ITagihandet} from 'src/app/core/interface/itagihan';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';;
import {TagihandetService} from 'src/app/core/services/tagihandet.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tagihan-bast-detail',
  templateUrl: './tagihan-bast-detail.component.html',
  styleUrls: ['./tagihan-bast-detail.component.scss']
})
export class TagihanBastDetailComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: ITagihandet[] = [];
  dataSelected : ITagihandet = null;
  userInfo: ITokenClaim;
  @Input() tagihanSelected: ITagihan;
  @ViewChild('dt',{static:false}) dt: any;
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
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idtagihandet === e.data.idtagihandet);
      this.listdata = this.listdata.filter(f => f.idtagihandet != e.data.idtagihandet);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
    this.dt.reset();
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
  rekKlik(e: ITagihandet){
    this.dataSelected = e;
  }
  ngOnDestroy() : void {
    this.dataSelected = null;
    this.listdata = [];
  }
}
