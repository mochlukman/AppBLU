import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {SpjapbddetService} from 'src/app/core/services/spjapbddet.service';
import {
  PembuatanSpjApbdRincianFormComponent
} from 'src/app/pages/akuntansi/transaksi-apbd/realisasi-apbd/pembuatan-spj-apbd/pembuatan-spj-apbd-rincian/pembuatan-spj-apbd-rincian-form/pembuatan-spj-apbd-rincian-form.component';

@Component({
  selector: 'app-pembuatan-spj-apbd-rincian',
  templateUrl: './pembuatan-spj-apbd-rincian.component.html',
  styleUrls: ['./pembuatan-spj-apbd-rincian.component.scss']
})
export class PembuatanSpjApbdRincianComponent implements OnInit, OnDestroy, OnChanges {
  loading: boolean;
  listdata: any[] = [];
  dataSelected : any = null;
  userInfo: ITokenClaim;
  @Input() apbdSelected: any;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(PembuatanSpjApbdRincianFormComponent,{static: true}) Form : PembuatanSpjApbdRincianFormComponent;
  constructor(
    private service: SpjapbddetService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.apbdSelected;
    this.get();
  }
  callback(e: any){
    if(e.added || e.edited){
      this.get();
    }
  }
  get(){
    if(this.apbdSelected){
      this.loading = true;
      this.listdata = [];
      const param = {
        Idspjapbd: this.apbdSelected.idspjapbd,
        Idnojetra: 41
      }
      this.service.gets(param)
        .subscribe(resp => {
          if(resp.length){
            this.listdata = [...resp]
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
        }, error => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    } else {
      this.listdata = [];
    }
  }
  totalNilai(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  rekKlik(e: any){
    this.dataSelected = e;
  }
  add(){
    this.Form.title = 'Tambah';
    this.Form.mode = 'add';
    this.Form.apbSelected = this.apbdSelected;
    this.Form.forms.patchValue({
      idspjapbd: this.apbdSelected.idspjapbd
    });
    this.Form.showThis = true;
  }
  update(e: any){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idspjapbddet : e.idspjapbddet,
      idspjapbd: e.idspjapbd,
      idnojetra: e.idnojetra,
      idjdana: e.idjdana,
      idrek : e.idrek,
      nilai : e.nilai
    });
    if(e.idrekNavigation){
      this.Form.uiRek = {kode: e.idrekNavigation.kdper, nama: e.idrekNavigation.nmper};
      this.Form.rekeningSelected = e.idrekNavigation;
    }
    if(e.idjdanaNavigation){
      this.Form.danaSelected = e.idjdanaNavigation;
    }
    if(e.idnojetraNavigation){
      this.Form.transKasSelected = e.idnojetraNavigation;
    }
    this.Form.showThis = true;
  }
  delete(e: any){
    this.notif.confir({
      message: `${e.idrekNavigation.kdper} - ${e.idrekNavigation.nmper} Akan Dihapus`,
      accept: () => {
        this.service.delete(e.idspjapbddet).subscribe(
          (resp) => {
            if (resp.ok) {
              this.get();
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
  ngOnDestroy() : void {
    this.dataSelected = null;
    this.listdata = [];
  }
}
