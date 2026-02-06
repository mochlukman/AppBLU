import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MappingLoService } from 'src/app/core/services/mapping-lo.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LoFormComponent } from '../../lo-form/lo-form.component';

@Component({
  selector: 'app-lo-belanja-rincian',
  templateUrl: './lo-belanja-rincian.component.html',
  styleUrls: ['./lo-belanja-rincian.component.scss']
})
export class LoBelanjaRincianComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dataselected: IDaftrekening | null;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  @ViewChild('dt', {static:false}) dt: any;
  @ViewChild(LoFormComponent, {static: true}) form: LoFormComponent;
  constructor(
    private service: MappingLoService,
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
      this.service.gets(this.dataselected.idjnsakun.toString(), this.dataselected.idrek).subscribe(resp => {
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
    this.form.jsnakun = this.dataselected.idjnsakun;
    let idrekExist:any[] = [];
    if(this.listdata.length > 0){
      this.listdata.forEach(f => idrekExist.push(f.idreklraNavigation.idrek));
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
    	message: `${e.idreklraNavigation.nmper} Akan Dihapus ?`,
    	accept: () => {
    		this.service.delete(this.dataselected.idjnsakun.toString(), e.idsetrlralo).subscribe(
    			(resp) => {
    				if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              this.listdata = this.listdata.filter(f => f.idsetrlralo !== e.idsetrlralo);
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