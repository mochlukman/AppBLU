import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IDaftrekening} from 'src/app/core/interface/idaftrekening';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {SetpendbljService} from 'src/app/core/services/setpendblj.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {
  RekeningUtangRincianFormComponent
} from 'src/app/pages/referensi/mapping/map-utang-pfk/rekening-utang/rekening-utang-rincian/rekening-utang-rincian-form/rekening-utang-rincian-form.component';
import {SetmappfkService} from 'src/app/core/services/setmappfk.service';

@Component({
  selector: 'app-rekening-utang-rincian',
  templateUrl: './rekening-utang-rincian.component.html',
  styleUrls: ['./rekening-utang-rincian.component.scss']
})
export class RekeningUtangRincianComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dataselected: IDaftrekening | null;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  @ViewChild('dt', {static:false}) dt: any;
  @ViewChild(RekeningUtangRincianFormComponent, {static: true}) form: RekeningUtangRincianFormComponent;
  constructor(
    private service: SetmappfkService,
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
      this.service.gets({Idreknrc: this.dataselected.idrek}).subscribe(resp => {
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
    this.form.title = 'Pilih Jenis Potongan';
    this.form.idreknrc = this.dataselected.idrek;
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
      message: `${e.idrekpotNavigation.kdjnspajak} - ${e.idrekpotNavigation.nmjnspajak} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.idmappfk ).subscribe(
          (resp) => {
            if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              this.listdata = this.listdata.filter(f => f.idmappfk !== e.idmappfk);
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
