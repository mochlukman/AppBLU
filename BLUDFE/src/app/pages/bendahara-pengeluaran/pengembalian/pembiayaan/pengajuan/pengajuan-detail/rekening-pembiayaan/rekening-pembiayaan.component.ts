import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { IStsdetb } from 'src/app/core/interface/istsdetb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsdetbService } from 'src/app/core/services/stsdetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { PopupLoadingComponent } from 'src/app/shared/Component/popup-loading/popup-loading.component';
import { LookDaftrekBydpabComponent } from 'src/app/shared/lookups/look-daftrek-bydpab/look-daftrek-bydpab.component';
import { RekeningPembiayaanFormComponent } from './rekening-pembiayaan-form/rekening-pembiayaan-form.component';

@Component({
  selector: 'app-rekening-pembiayaan',
  templateUrl: './rekening-pembiayaan.component.html',
  styleUrls: ['./rekening-pembiayaan.component.scss']
})
export class RekeningPembiayaanComponent implements OnInit {
  @Input() stsselected: any;
  loading: boolean;
  listdata: IStsdetb[] = [];
  userInfo: ITokenClaim;
  @ViewChild(LookDaftrekBydpabComponent, {static: true}) Form : LookDaftrekBydpabComponent;
  @ViewChild(RekeningPembiayaanFormComponent, {static: true}) FormNilai: RekeningPembiayaanFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: IStsdetb;
  constructor(
    private service: StsdetbService,
    private authService: AuthenticationService,
    private notif: NotifService,
    private dialog: DialogService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
    this.get();
  }
  callback(e: any){
    if(e.edited){
      this.get();
    }
  }
  get(){
    if(this.stsselected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.stsselected.idsts)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          
          this.loading = false;
        },(error) => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(var i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    }
  }
  add(){
    this.Form.title = 'Tambah Rekening Pembiayaan';
    this.Form._idunit = this.stsselected.idunit;
    this.Form._Mtglevel = '6';
    this.Form._kdperStartwith = '6.2';
    this.Form.showThis = true;
  }
  callbackAdd(e: any){
    if(e && e.length > 0){
      let postBody = {
        idsts: this.stsselected.idsts,
        idrek: []
      }
      e.forEach((f: any) => {
        postBody.idrek.push(f.idrek);
      });
      const overlay = this.dialog.open(PopupLoadingComponent, {
        data: {
          message: 'Menyimpan Data' 
        }
      });
      this.service.post(postBody).subscribe(resp => {
        if(resp.ok){
          this.notif.success('Input Data Berhasil');
          this.get();
        }
        overlay.close(true);
      }, (error) => {
        overlay.close(true);
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      })
    } else {
      console.log('kosong');
    }
  }
  update(e: IStsdetb){
    this.FormNilai.forms.patchValue({
      idstsdetb : e.idstsdetb,
      nilai : e.nilai
    });
    this.FormNilai.title = 'Ubah Nilai';
    this.FormNilai.showThis = true;
  }
  delete(e: IStsdetb){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idstsdetb).subscribe(
					(resp) => {
						if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
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
}