import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { ICheckdok } from 'src/app/core/interface/icheckdok';
import { ISp2dcheckdok } from 'src/app/core/interface/isp2dcheckdok';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Sp2dcheckdokService } from 'src/app/core/services/sp2dcheckdok.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookCheckdokCheckboxComponent } from 'src/app/shared/lookups/look-checkdok-checkbox/look-checkdok-checkbox.component';

@Component({
  selector: 'app-sp2d-ls-nonpegawai-verifikasi-check',
  templateUrl: './sp2d-ls-nonpegawai-verifikasi-check.component.html',
  styleUrls: ['./sp2d-ls-nonpegawai-verifikasi-check.component.scss']
})
export class Sp2dLsNonpegawaiVerifikasiCheckComponent implements OnInit {
  private Idsp2d: number;
  set _idsp2d(e: number){
    this.Idsp2d = e;
  }
  private Idxkode: number;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  showThis: boolean;
  title: string = '';
  loading: boolean = false;
  listdata: ISp2dcheckdok[] = [];
  msg: Message[];
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild(LookCheckdokCheckboxComponent, {static: true}) Checks : LookCheckdokCheckboxComponent;
  isvalid: boolean = false;
  loading_post: boolean = false;
  constructor(
    private service: Sp2dcheckdokService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }

  ngOnInit() {
  }
  get(){
    this.listdata = [];
      if(this.loading) this.loading = true;
      this.service._idsp2d = this.Idsp2d;
      this.service.gets().subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        }
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.msg = []
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }      
      });
  }
  callback(e: any){
    if (e.added) {
      this.listdata.push(...e.data);
      this.msg = [];
      this.msg.push({severity: 'success', summary: 'success', detail: 'Data Berhasil Ditambahkan'});
      if (this.dt) this.dt.reset();
    }
  }
  add(){
    this.Checks.title = 'Pilih Kelengkapan Dokumen';
    this.Checks._idsp2d = this.Idsp2d;
    this.Checks._idxkode = this.Idxkode;
    this.Checks.showThis = true;
  }
  callbackCheck(e: ICheckdok[]){
    if(e.length > 0){
      let postBody = {
        idsp2d: this.Idsp2d,
        idxkode: this.Idxkode,
        idcheck: []
      };
      e.forEach(x => {
        postBody.idcheck.push(x.idcheck);
      });
      this.loading_post = true;
      this.service.post(postBody).subscribe((resp) => {
        if (resp.ok) {
          this.callback({
            added: true,
            data: resp.body
          });
        }
        this.loading_post = false;
      }, (error) => {
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
        this.loading_post = false;
      });
    }
  }
  delete(e: ISp2dcheckdok){
    let postBody = {
      idsp2d: e.idsp2d,
      idcheck: e.idcheck
    };
    this.loading_post = true;
    this.notif.confir({
			message: `${e.idcheckNavigation.uraian} Akan Dihapus`,
			accept: () => {
				this.service.delete(postBody).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idcheck !== e.idcheck);
              this.msg = [];
              this.msg.push({severity: 'success', summary: 'success', detail: 'Data Berhasil Dihapus'});
              this.dt.reset();
						}
            this.loading_post = false;
					}, (error) => {
            if(Array.isArray(error.error.error)){
              this.msg = [];
              for(var i = 0; i < error.error.error.length; i++){
                this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
              }
            } else {
              this.msg = [];
              this.msg.push({severity: 'error', summary: 'error', detail: error.error});
            }
            this.loading_post = false;
          });
			},
			reject: () => {
				return false;
			}
		});
  }
  onShow(){
    this.get();
  }
  onHide(){
    this.listdata = [];
    this.loading = false;
    this.msg = [];
    this.showThis = false;
    this.loading_post = false;
  }
}
