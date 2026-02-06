import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISts } from 'src/app/core/interface/ists';
import { ITbp } from 'src/app/core/interface/itbp';
import { ITbpsts } from 'src/app/core/interface/itbpsts';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsdetdService } from 'src/app/core/services/stsdetd.service';
import { TbpService } from 'src/app/core/services/tbp.service';
import { TbpstsService } from 'src/app/core/services/tbpsts.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookTbpComponent } from 'src/app/shared/lookups/look-tbp/look-tbp.component';

@Component({
  selector: 'app-dpengajuan-tbp',
  templateUrl: './dpengajuan-tbp.component.html',
  styleUrls: ['./dpengajuan-tbp.component.scss']
})
export class DPengajuanTbpComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: ITbpsts[] = [];
  @Input() StsSelected : ISts;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(LookTbpComponent, {static: true}) Tbp : LookTbpComponent;
  group1: boolean;
  group2: boolean;
  constructor(
    private servicedet: StsdetdService,
    private service: TbpstsService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.group1 = false;
    this.group2 = false;
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.StsSelected && this.tabIndex == 0){
      if(['16'].indexOf(this.StsSelected.kdstatus.trim()) > -1){
        this.group1 = true;
        this.group2 = false;
      }
      if(['60','61','63','64'].indexOf(this.StsSelected.kdstatus.trim()) > -1){
        this.group1 = false;
        this.group2 = true;
      }
      this.get();
    }
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    }
  }
  callBackTbp(e: ITbp){
    if(e.idtbp){
      this.loading = true;
      this.service.post({idtbp: e.idtbp, idsts: this.StsSelected.idsts})
        .subscribe(resp => {
          if(resp.ok){
            this.callback({added: true, data: resp.body});
            this.notif.success('TBP Berhasil Ditambahkan');
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
        });;
    }
  }
  get(){
    if(this.StsSelected){
      this.loading = true;
      this.listdata = [];
      this.service.bySts(this.StsSelected.idsts)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
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
  }
  add(){
    this.Tbp.gets(this.StsSelected.idunit, this.StsSelected.kdstatus.trim(), this.StsSelected.idxkode, this.StsSelected.idbend, false, true);
    this.Tbp.title = "Pilih TBP";
    this.Tbp.listExist = this.listdata.map(m => m.idtbp);
    this.Tbp.showThis = true;
  }
  delete(e: ITbpsts){
    this.notif.confir({
			message: `${e.idtbpNavigation.uraitbp} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idtbp, e.idsts).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idtbp !== e.idtbp);
              this.notif.success('Data berhasil dihapus');
              if(this.dt) this.dt.reset();
						}
					}, (error) => {
            if(Array.isArray(error.error.error)){
              for(var i = 0; i < error.error.error.length; i++){
                this.notif.error(error.error.error[i]);
              }
            } else {
              this.notif.error(error.error);
            }
          });
			},
			reject: () => {
				return false;
			}
		});
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.StsSelected = null;
  }
}
