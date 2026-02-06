import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { IfService } from 'src/app/core/services/if.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-surflus-rincian',
  templateUrl: './surflus-rincian.component.html',
  styleUrls: ['./surflus-rincian.component.scss']
})
export class SurflusRincianComponent implements OnInit, OnDestroy, OnChanges {
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

  subTotalD(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => {
        if(f.kdpers.trim() == 'D'){
          total += +f.nilai;
        }
      });
		}
		return total;
  }
  subTotalK(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => {
        if(f.kdpers.trim() == 'K'){
          total += +f.nilai;
        }
      });
		}
		return total;
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
