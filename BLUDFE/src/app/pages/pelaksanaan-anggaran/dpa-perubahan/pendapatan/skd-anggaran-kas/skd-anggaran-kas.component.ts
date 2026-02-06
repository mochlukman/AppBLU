import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IDpablnd } from 'src/app/core/interface/idpablnd';
import { IDpad } from 'src/app/core/interface/idpad';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpablndService } from 'src/app/core/services/dpablnd.service';
import { DpadService } from 'src/app/core/services/dpad.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormKasdComponent } from './form-kasd/form-kasd.component';

@Component({
  selector: 'app-skd-anggaran-kas',
  templateUrl: './skd-anggaran-kas.component.html',
  styleUrls: ['./skd-anggaran-kas.component.scss']
})
export class SkdAnggaranKasComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  @Input() rekSelected: IDpad;
  loading: boolean = false;
  listdata: IDpablnd[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static: true}) dt: any;
  @ViewChild(FormKasdComponent, {static: true}) Form: FormKasdComponent;
  constructor(
    private service: DpablndService,
    private service_rek: DpadService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 1){
      this.get();
    } else {
      this.listdata = []
    }
  }

  ngOnInit() {
  }
  get(){
    if(this.rekSelected && this.tabIndex == 1){
      this.loading = true;
      this.listdata = [];
      if(this.dt) this.dt.reset();
      this.service.gets(this.rekSelected.iddpad)
        .subscribe(resp => {
          this.listdata = [];
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Penjabaran Tidak Tersedia');
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
  }
  callback(e: any){
    if(e.edited){
      let index = this.listdata.findIndex(f => f.iddpablnd === e.data.iddpablnd);
      this.listdata = this.listdata.filter(f => f.iddpablnd != e.data.iddpablnd);
      this.listdata.splice(index, 0, e.data);
      this.totalNilai();
    }
  }
  put(e: IDpablnd){
    this.Form.title = 'Ubah';
    this.Form.forms.patchValue({
      iddpablnd: e.iddpablnd,
      iddpad: e.iddpad,
      idbulan: e.idbulan,
      ketbulan: e.ketbulan,
      nilai: e.nilai
    });
    this.Form.showThis = true;
  }
  totalNilai(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => total += f.nilai);
		}
		return total;
  }
  ngOnDestroy():void{
    this.listdata = [];
    this.rekSelected = null;
  }
}