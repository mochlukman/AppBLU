import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IRkadanar } from 'src/app/core/interface/irkadanar';
import { IRkar } from 'src/app/core/interface/irkar';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { RkadanarService } from 'src/app/core/services/rkadanar.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-rkardana',
  templateUrl: './rkardana.component.html',
  styleUrls: ['./rkardana.component.scss']
})
export class RkardanaComponent implements OnInit {
  showThis: boolean;
  title: string = '';
  loading: boolean = false;
  rkaSelected: IRkar = null;
  listdata: IRkadanar[] = [];
  msg: Message[];
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:true}) dt: any;
  constructor(
    private service: RkadanarService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }

  ngOnInit() {
  }
  get(){
    if(this.rkaSelected){
      this.listdata = [];
      if(this.loading) this.loading = true;
      this.service.gets(this.rkaSelected.idrkar).subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        }
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.msg = []
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }      
      });
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      this.msg = [];
      this.msg.push({severity: 'success', summary: 'success', detail: 'Data Berhasil Ditambahkan'});
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idrkadanar === e.data.idrkadanar);
      this.listdata = this.listdata.filter(f => f.idrkadanar != e.data.idrkadanar);
      this.listdata.splice(index, 0, e.data);
      this.msg = [];
      this.msg.push({severity: 'success', summary: 'success', detail: 'Data Berhasil Diubah'});
    }
    if(this.dt) this.dt.reset();
  }
  onShow(){
    this.get();
  }
  onHide(){
    this.rkaSelected = null;
    this.listdata = [];
    this.loading = false;
    this.msg = [];
    this.showThis = false;
  }
}
