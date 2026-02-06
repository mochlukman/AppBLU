import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MappingUtangPiutangService } from 'src/app/core/services/mapping-utang-piutang.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { UtangPiutangFormComponent } from '../../utang-piutang-form/utang-piutang-form.component';

@Component({
  selector: 'app-piutang-rincian',
  templateUrl: './piutang-rincian.component.html',
  styleUrls: ['./piutang-rincian.component.scss']
})
export class PiutangRincianComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dataselected: IDaftrekening | null;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  @ViewChild('dt', {static:false}) dt: any;
  @ViewChild(UtangPiutangFormComponent, {static: true}) form: UtangPiutangFormComponent;
  constructor(
    private service: MappingUtangPiutangService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.gets();
  }
  gets(){
    if(this.dataselected){
      this.loading = true;
      this.listdata = [];
      this.service.gets('7', this.dataselected.idrek).subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
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
  }
  add(){
    this.form.title = 'Pilih Rekening LRA';
    this.form.idreklo = this.dataselected.idrek;
    this.form.jsnakun = 7;
    let idrekExist:any[] = [];
    if(this.listdata.length > 0){
      this.listdata.forEach(f => idrekExist.push(f.idreknrcNavigation.idrek));
      this.form.listExist = idrekExist;
    }
    this.form.showThis = true;
  }
  callback(e: any){
    if(e.added){
      this.gets();
    }
  }
  delete(e: any){
    this.notif.confir({
    	message: `${e.idreknrcNavigation.nmper} Akan Dihapus ?`,
    	accept: () => {
    		this.service.delete('7', e.idsetupdlo).subscribe(
    			(resp) => {
    				if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              this.listdata = this.listdata.filter(f => f.idsetupdlo !== e.idsetupdlo);
              this.listdata.sort((a,b) =>  (a.kdper.trim() > b.kdper.trim() ? 1 : -1));
              this.dt.reset();
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
  }
}
