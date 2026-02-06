import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {IPanjardet} from 'src/app/core/interface/ipanjardet';
import {IPanjar} from 'src/app/core/interface/ipanjar';
import {PanjardetService} from 'src/app/core/services/panjardet.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-panjar-rincian-kegiatan-pengesahan',
  templateUrl: './panjar-rincian-kegiatan-pengesahan.component.html',
  styleUrls: ['./panjar-rincian-kegiatan-pengesahan.component.scss']
})
export class PanjarRincianKegiatanPengesahanComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  loading_post: boolean;
  loading: boolean;
  userInfo: ITokenClaim;
  listdata: IPanjardet[];
  dataSelected: IPanjardet;
  @Input() panjarSelected: IPanjar;
  @ViewChild('dt', {static:true}) dt: any;
  constructor(
    private service: PanjardetService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.panjarSelected
    if(this.tabIndex == 0){
      this.get();
    } else {
      this.listdata = [];
    }
  }
  get(){
    this.loading = true;
    this.listdata = [];
    this.service.gets(this.panjarSelected.idpanjar)
      .subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        } else {
          this.notif.info('Data Kegiatan Tidak Tersedia');
        }
        this.loading = false;
      }, (error) => {
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
  subTotal(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  ngOnDestroy():void{
    this.dataSelected = null;
    this.panjarSelected = null;
    this.listdata = [];
  }
}
