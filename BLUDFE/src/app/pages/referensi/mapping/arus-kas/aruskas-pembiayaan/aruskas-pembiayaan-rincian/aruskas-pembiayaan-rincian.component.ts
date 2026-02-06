import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MappingArusKasService } from 'src/app/core/services/mapping-arus-kas.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { ArusKasFormComponent } from '../../arus-kas-form/arus-kas-form.component';

@Component({
  selector: 'app-aruskas-pembiayaan-rincian',
  templateUrl: './aruskas-pembiayaan-rincian.component.html',
  styleUrls: ['./aruskas-pembiayaan-rincian.component.scss']
})
export class AruskasPembiayaanRincianComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dataselected: any | null;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  @ViewChild('dt', {static:false}) dt: any;
  @ViewChild(ArusKasFormComponent, {static: true}) form: ArusKasFormComponent;
  constructor(
    private service: MappingArusKasService,
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
      this.service.gets(this.dataselected.idjnslak.toString(), this.dataselected.idrek).subscribe(resp => {
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
    this.form.title = 'Pilih Rekening';
    this.form.idreklak = this.dataselected.idrek;
    this.form.idjnslak = this.dataselected.idjnslak;
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
    		this.service.delete(this.dataselected.idjnslak.toString(), e.idsetblak).subscribe(
    			(resp) => {
    				if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              this.listdata = this.listdata.filter(f => f.idsetblak !== e.idsetblak);
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