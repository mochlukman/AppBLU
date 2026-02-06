import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IDpadanar } from 'src/app/core/interface/idpadanar';
import { IDpar } from 'src/app/core/interface/idpar';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpadanarService } from 'src/app/core/services/dpadanar.service';
import { DparService } from 'src/app/core/services/dpar.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormSkrSumberdanaComponent } from './form-skr-sumberdana/form-skr-sumberdana.component';

@Component({
  selector: 'app-skr-sumberdana',
  templateUrl: './skr-sumberdana.component.html',
  styleUrls: ['./skr-sumberdana.component.scss']
})
export class SkrSumberdanaComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  @Input() rekSelected: IDpar;
  loading: boolean = false;
  listdata: IDpadanar[] = [];
  userInfo: ITokenClaim;
  @ViewChild('sb', {static: true}) dt: any;
  @ViewChild(FormSkrSumberdanaComponent,{static: true}) formDana : FormSkrSumberdanaComponent;
  constructor(
    private service: DpadanarService,
    private service_rek: DparService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 2){
      this.get();
    } else {
      this.listdata = [];
    }
  }

  ngOnInit() {
  }
  get(){
    if(this.rekSelected && this.tabIndex == 2){
      this.loading = true;
      this.listdata = [];
      if(this.dt) this.dt.reset();
      this.service.gets(this.rekSelected.iddpar)
        .subscribe(resp => {
          this.listdata = [];
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Sumber Dana Tidak Tersedia');
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
  callBack(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.iddpadanar === e.data.iddpadanar);
      this.listdata = this.listdata.filter(f => f.iddpadanar != e.data.iddpadanar);
      this.listdata.splice(index, 0, e.data);
    }
    if(this.dt) this.dt.reset();
  }
  add(){
    this.formDana.title = 'Tambah Data';
    this.formDana.mode = 'add';
    this.formDana.forms.patchValue({
      iddpar: this.rekSelected.iddpar
    });
    this.formDana.showThis = true;
  }
  edit(e: IDpadanar){
    this.formDana.title = 'Ubah Data';
    this.formDana.mode = 'edit';
    if(e.idjdanaNavigation != null){
      this.formDana.uiDana = {kode: e.idjdanaNavigation.kddana, nama: e.idjdanaNavigation.nmdana};
    }
    this.formDana.forms.patchValue({
      iddpadanar : e.iddpadanar,
      iddpar : e.iddpar,
      idjdana : e.idjdana,
      nilai : e.nilai,
    });
    this.formDana.showThis = true;
  }
  delete(e: IDpadanar){
    this.notif.confir({
			message: '',
			accept: () => {
				this.service.delete(e.iddpadanar).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.iddpadanar !== e.iddpadanar);
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
  ngOnDestroy():void{
    this.listdata = [];
    this.rekSelected = null;
  }
}