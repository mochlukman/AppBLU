import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { IKontrak, IKontrakdetr } from 'src/app/core/interface/ikontrak';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { KontrakService } from 'src/app/core/services/kontrak.service';
import { KontrakdetrService } from 'src/app/core/services/kontrakdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormKontrakDetailComponent } from './form-kontrak-detail/form-kontrak-detail.component';

@Component({
  selector: 'app-kontrak-detail',
  templateUrl: './kontrak-detail.component.html',
  styleUrls: ['./kontrak-detail.component.scss']
})
export class KontrakDetailComponent implements OnInit {
  loading: boolean;
  listdata: IKontrakdetr[] = [];
  dataSelected : IKontrakdetr = null;
  cols: any[] = [];
  userInfo: ITokenClaim;
  kontrakSelected: IKontrak;
  sub_kontrak: Subscription;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(FormKontrakDetailComponent,{static: true}) Form : FormKontrakDetailComponent;
  @Output() callBackDetail = new EventEmitter();
  constructor(
    private kontrakService: KontrakService,
    private service: KontrakdetrService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.cols = [
      {field: 'rekening.kdper'},
      {field: 'rekening.nmper'},
      {field: 'bulan.ketBulan'},
      {field: 'nilai'},
      {field: 'pilih'}
    ];
    this.sub_kontrak = this.kontrakService._kontrakSelected.subscribe(resp => {
      this.kontrakSelected = resp;
      this.get();
    });
  }

  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.iddetkontrak === e.data.iddetkontrak);
      this.listdata = this.listdata.filter(f => f.iddetkontrak != e.data.iddetkontrak);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
    this.callBackDetail.emit(e);
  }
  get(){
    if(this.kontrakSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.kontrakSelected.idkontrak)
        .subscribe(resp => {
          if(resp.length){
            this.listdata = [...resp]
          } else {
            this.notif.info('Data Rekening Tidak Tersedia');
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
    }
  }
  totalNilai(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => total += f.nilai);
		}
		return total;
  }
  rekKlik(e: IKontrakdetr){
    this.dataSelected = e;
  }
  add(){
    this.Form.title = 'Tambah';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idkontrak: this.kontrakSelected.idkontrak,
      idunit: this.kontrakSelected.idunit,
      idkeg: this.kontrakSelected.idkeg
    });
    this.Form.showThis = true;
  }
  update(e: IKontrakdetr){
    this.Form.title = 'Ubah Detail';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      iddetkontrak : e.iddetkontrak,
      idkontrak : e.idkontrak,
      idrek :e.idrek,
      idbulan: e.idbulan,
      idjtermorlun: e.idjtermorlun,
      nilai : e.nilai
    });
    if(e.rekening){
      this.Form.uiRek = {kode: e.rekening.kdper, nama: e.rekening.nmper};
    }
    this.Form.showThis = true;
  }
  delete(e: IKontrakdetr){
    this.notif.confir({
			message: `${e.rekening.kdper} - ${e.rekening.nmper} Akan Dihapus`,
			accept: () => {
				this.service.delete(e.iddetkontrak).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.iddetkontrak !== e.iddetkontrak);
              this.listdata.sort((a,b) =>  (a.idrek > b.idrek ? 1 : -1));
              this.notif.success('Data berhasil dihapus');
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
  ngOnDestroy() : void {
    this.dataSelected = null;
    this.listdata = [];
    this.sub_kontrak.unsubscribe();
  }
}
