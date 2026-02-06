import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DaftarBankFormComponent} from 'src/app/pages/referensi/pendukung/daftar-bank/daftar-bank-form/daftar-bank-form.component';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {GlobalService} from 'src/app/core/services/global.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {DaftbankService} from 'src/app/core/services/daftbank.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-daftar-bank',
  templateUrl: './daftar-bank.component.html',
  styleUrls: ['./daftar-bank.component.scss']
})
export class DaftarBankComponent implements OnInit, OnDestroy {
  title: string = '';
  loading: boolean = false;
  userInfo: ITokenClaim;
  listdata: any[] = [];
  @ViewChild(DaftarBankFormComponent, {static: true}) Form: DaftarBankFormComponent;
  constructor(
    private global: GlobalService,
    private authService: AuthenticationService,
    private service: DaftbankService,
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
      idbank: e.idbank,
      kdbank: e.kdbank,
      akbank: e.akbank,
      alamat: e.alamat,
      telepon: e.telepon,
      cabang: e.cabang,
    });
  }
  delete(e: any){
    this.notif.confir({
      message: `${e.kdbank} - ${e.akbank} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.idbank).subscribe(
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
