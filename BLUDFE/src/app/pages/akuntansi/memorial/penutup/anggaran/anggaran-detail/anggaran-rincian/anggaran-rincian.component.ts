import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { IfService } from 'src/app/core/services/if.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-anggaran-rincian',
  templateUrl: './anggaran-rincian.component.html',
  styleUrls: ['./anggaran-rincian.component.scss']
})
export class AnggaranRincianComponent implements OnInit, OnDestroy, OnChanges {
  @Input() BktmemSelected : any;
  loading: boolean;
  listdata: any[] = [];
  dataselected: any;
  userInfo: any;
  constructor(
    private auth: AuthenticationService,
    private service: IfService,
    private notif: NotifService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.BktmemSelected.currentValue){
      this.gets();
    }
  }
  gets(){
    this.loading = true;
    this.listdata = [];
    const param = {
      Idbm : this.BktmemSelected.idbm
    };
    this.service.get(`Bktmemdet`, param).subscribe(resp => {
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
  callback(data: any){
    if(data.added || data.edited){
      this.gets();
    }
  }
  ngOnDestroy(): void {
    this.listdata = []
    this.dataselected = null;
  }
}