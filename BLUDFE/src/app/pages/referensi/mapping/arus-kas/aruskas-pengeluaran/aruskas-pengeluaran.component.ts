import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftreklakService } from 'src/app/core/services/daftreklak.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-aruskas-pengeluaran',
  templateUrl: './aruskas-pengeluaran.component.html',
  styleUrls: ['./aruskas-pengeluaran.component.scss']
})
export class AruskasPengeluaranComponent implements OnInit, OnDestroy {
  loading: boolean;
  listdata: any[] = [];
  dataselected: any | null;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  constructor(
    private service: DaftreklakService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnInit() {
    this.get();
  }
  get(){
    this.loading = true;
    this.listdata = [];
    this.service.gets({Idjnslak: '2'}).subscribe(resp => {
      if(resp.length > 0){
        this.listdata = [...resp];
      } else {
        this.notif.info('Data Tidak Tersedia');
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
			if(Array.isArray(error.error.error)){
				for(var i = 0; i < error.error.error; i++){
          this.notif.error(error.error.error[i]);
				}
			} else {
				this.notif.error(error.error);
			}
    });
  }
  rincian(e: any){
    this.dataselected = e;
  }
  ngOnDestroy(): void {
   this.listdata = [];
   this.loading = false;
  }
}
