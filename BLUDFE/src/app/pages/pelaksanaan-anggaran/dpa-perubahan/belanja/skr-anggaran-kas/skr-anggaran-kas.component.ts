import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IDpablnr } from 'src/app/core/interface/idpablnr';
import { IDpar } from 'src/app/core/interface/idpar';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpablnrService } from 'src/app/core/services/dpablnr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormKasrComponent } from './form-kasr/form-kasr.component';

@Component({
  selector: 'app-skr-anggaran-kas',
  templateUrl: './skr-anggaran-kas.component.html',
  styleUrls: ['./skr-anggaran-kas.component.scss']
})
export class SkrAnggaranKasComponent implements OnInit, OnDestroy , OnChanges {
  @Input() tabIndex: number = 0;
  @Input() rekSelected: IDpar;
  loading: boolean = false;
  listdata: IDpablnr[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static: true}) dt: any;
  @ViewChild(FormKasrComponent, {static: true}) Form: FormKasrComponent;
  constructor(
    private service: DpablnrService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 1){
      this.get();
    } else {
      this.listdata = [];
    }
  }

  ngOnInit() {
  }
  get(){
    if(this.rekSelected && this.tabIndex == 1){
      this.loading = true;
      this.listdata = [];
      if(this.dt) this.dt.reset();
      this.service.gets(this.rekSelected.iddpar)
        .subscribe(resp => {
          this.listdata = [];
          if(resp.length > 0){
            this.listdata = [...resp];
            this.totalNilai();
          } else {
            this.notif.info('Data Anggaran Kas Tidak Tersedia');
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
  callback(e: any){
    if(e.edited){
      //let index = this.listdata.findIndex(f => f.iddpablnr === e.data.iddpablnr);
      //this.listdata = this.listdata.filter(f => f.iddpablnr != e.data.iddpablnr);
      //this.listdata.splice(index, 0, e.data);
      this.get();
      //this.totalNilai();
    }
  }
  put(e: IDpablnr){
    this.Form.title = 'Ubah Nilai';
    this.Form.forms.patchValue({
      iddpablnr: e.iddpablnr,
      iddpar: e.iddpar,
      idbulan: e.idbulan,
      ketbulan: e.ketbulan,
      nilai: e.nilai
    });
    this.Form.showThis = true;
  }
  totalNilai(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => total += f.nilai);
		}
		return total;
  }
  ngOnDestroy():void{
    this.listdata = [];
    this.rekSelected = null;
  }
}