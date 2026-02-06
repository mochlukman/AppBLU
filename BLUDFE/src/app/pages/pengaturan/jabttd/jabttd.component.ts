import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IJabttd } from 'src/app/core/interface/ijabttd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { JabttdService } from 'src/app/core/services/jabttd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormJabttdComponent } from './form-jabttd/form-jabttd.component';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-jabttd',
  templateUrl: './jabttd.component.html',
  styleUrls: ['./jabttd.component.scss']
})
export class JabttdComponent implements OnInit, OnDestroy {
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IJabttd[] = [];
  cols: any[] = [];
  dataSelected: IJabttd = null;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild(FormJabttdComponent, {static: true}) Form: FormJabttdComponent;
  title: string = '';
  constructor(
    private auth: AuthenticationService,
    private service: JabttdService,
    private notif: NotifService,
    private global: GlobalService
  ) {
    this.global._title.subscribe((s) => this.title = s);
    this.userInfo = this.auth.getTokenInfo();
    this.cols = [
      {field: 'kddok'},
      {field: 'kddokNavigation.nmdok'},
      {field: 'idpegNavigation.nip'},
      {field: 'idpegNavigation.nama'},
      {field: 'jabatan'},
      {field: 'pilih'}
		];
  }
  ngOnInit() {
    this.get();
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idttd === e.data.idttd);
      this.listdata = this.listdata.filter(f => f.idttd != e.data.idttd);
      this.listdata.splice(index, 0, e.data);
    }
  }
  get(){
    if(this.dt) this.dt.reset();
    this.loading = true;
    this.service.gets()
      .subscribe(resp => {
        this.listdata = [];
        if(resp.length > 0){
          this.listdata = [...resp];
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
        this.loading = false;
      }, (error) => {
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
  add(){
    this.Form.title = 'Tambah';
    this.Form.mode = 'add';
    this.Form.showThis = true;
  }
  update(e: IJabttd){
    this.Form.forms.patchValue({
      idttd : e.idttd,
      idunit : e.idunit,
      idpeg : e.idpeg,
      kddok : e.kddok,
      jabatan : e.jabatan,
      noskpttd : e.noskpttd,
      tglskpttd : e.tglskpttd,
      noskstopttd : e.noskstopttd,
      tglskstopttd : e.tglskstopttd,
    });
    if(e.idpegNavigation){
      this.Form.uiPeg = {kode : e.idpegNavigation.nip != '' ? e.idpegNavigation.nip.trim() : '', nama: e.idpegNavigation.nama};
    }
    if(e.kddokNavigation) {
      this.Form.uiDok = {kode: e.kddokNavigation.kddok, nama: e.kddokNavigation.nmdok};
    }
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IJabttd){
    this.notif.confir({
			message: `${e.kddok} Akan Dihapus`,
			accept: () => {
				this.service.delete(e.idttd).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idttd !== e.idttd);
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
  dataKlick(e: IJabttd){
		this.dataSelected = e;
	}
  ngOnDestroy(): void {
    this.listdata = [];
		this.dataSelected = null;
  }
}
