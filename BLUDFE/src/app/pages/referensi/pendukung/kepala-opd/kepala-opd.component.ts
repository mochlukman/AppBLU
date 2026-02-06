import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {GlobalService} from 'src/app/core/services/global.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {AtasbendService} from 'src/app/core/services/atasbend.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {KepalaOpdFormComponent} from 'src/app/pages/referensi/pendukung/kepala-opd/kepala-opd-form/kepala-opd-form.component';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-kepala-opd',
  templateUrl: './kepala-opd.component.html',
  styleUrls: ['./kepala-opd.component.scss']
})
export class KepalaOpdComponent implements OnInit, OnDestroy {
  title: string = '';
  loading: boolean = false;
  userInfo: ITokenClaim;
  listdata: any[] = [];
  @ViewChild(KepalaOpdFormComponent, {static: true}) Form: KepalaOpdFormComponent;
  constructor(
    private global: GlobalService,
    private authService: AuthenticationService,
    private service: AtasbendService,
    private notif: NotifService,
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnInit() {
    this.gets();
  }
  gets(){
    this.service.gets().subscribe((resp: any) => {
      if(resp.length > 0){
        this.listdata = [...resp];
        console.log(this.listdata);
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
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.showThis = true;
  }
  edit(e: any){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
    this.Form.forms.patchValue({
      idpa: e.idpa,
      idunit: e.idunit,
      idpeg: e.idpeg
    });
    if(e.idunitNavigation){
      this.Form.unitSelected = e.idunitNavigation;
    }
    if(e.idpegNavigation){
      this.Form.pegawaiSelected = e.idpegNavigation;
    }
  }
  delete(e: any){
    this.notif.confir({
      message: `${e.idunitNavigation.kdunit} - ${e.idunitNavigation.nmunit} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.idpa).subscribe(
          (resp) => {
            if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              this.gets();
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
  callback(e: any){
    if(e.added || e.edited){
      this.gets();
    }
  }
  ngOnDestroy(): void{
    this.listdata = [];
  }
}
