import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IDaftrekening} from 'src/app/core/interface/idaftrekening';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {
  RbaPendapatanRincianFormComponent
} from 'src/app/pages/referensi/mapping/map-rba-apbd/rba-pendapatan/rba-pendapatan-rincian/rba-pendapatan-rincian-form/rba-pendapatan-rincian-form.component';
import {SetdapbdrbaService} from 'src/app/core/services/setdapbdrba.service';

@Component({
  selector: 'app-rba-pendapatan-rincian',
  templateUrl: './rba-pendapatan-rincian.component.html',
  styleUrls: ['./rba-pendapatan-rincian.component.scss']
})
export class RbaPendapatanRincianComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dataselected: IDaftrekening | null;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  @ViewChild('dt', {static:false}) dt: any;
  @ViewChild(RbaPendapatanRincianFormComponent, {static: true}) form: RbaPendapatanRincianFormComponent;
  constructor(
    private service: SetdapbdrbaService,
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
      this.service.gets({Idrekapbd: this.dataselected.idrek}).subscribe(resp => {
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
    this.form.idrekapbd = this.dataselected.idrek;
    let idrekExist:any[] = [];
    if(this.listdata.length > 0){
      this.listdata.forEach(f => idrekExist.push(f.idrekrbaNavigation.idrek));
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
      message: `${e.idrekrbaNavigation.kdper} - ${e.idrekrbaNavigation.nmper} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.idsetdapbdrba).subscribe(
          (resp) => {
            if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              this.listdata = this.listdata.filter(f => f.idsetdapbdrba !== e.idsetdapbdrba);
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
