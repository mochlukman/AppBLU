import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {JenisPajakFormComponent} from 'src/app/pages/referensi/penunjang/jenis-pajak/jenis-pajak-form/jenis-pajak-form.component';
import {GlobalService} from 'src/app/core/services/global.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {JnspajakService} from 'src/app/core/services/jnspajak.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-jenis-pajak',
  templateUrl: './jenis-pajak.component.html',
  styleUrls: ['./jenis-pajak.component.scss']
})
export class JenisPajakComponent implements OnInit, OnDestroy {
  title: string = '';
  loading: boolean = false;
  userInfo: ITokenClaim;
  listdata: any[] = [];
  @ViewChild(JenisPajakFormComponent, {static: true}) Form: JenisPajakFormComponent;
  constructor(
    private global: GlobalService,
    private authService: AuthenticationService,
    private service: JnspajakService,
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
      idjnspajak: e.idjnspajak,
      kdjnspajak: e.kdjnspajak,
      nmjnspajak: e.nmjnspajak
    });
  }
  delete(e: any){
    this.notif.confir({
      message: `${e.kdjnspajak} - ${e.nmjnspajak} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.idjnspajak).subscribe(
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

