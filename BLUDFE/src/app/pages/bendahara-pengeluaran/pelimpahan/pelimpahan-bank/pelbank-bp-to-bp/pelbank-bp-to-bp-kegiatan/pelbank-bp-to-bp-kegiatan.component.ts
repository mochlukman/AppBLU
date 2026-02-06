import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ITbpdett } from 'src/app/core/interface/itbpdett';
import { ITbpdettkeg } from 'src/app/core/interface/itbpdettkeg';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TbpdettkegService } from 'src/app/core/services/tbpdettkeg.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookMkegiatanByDpaComponent } from 'src/app/shared/lookups/look-mkegiatan-by-dpa/look-mkegiatan-by-dpa.component';
import { PelbankBpToBpKegiatanFormComponent } from '../pelbank-bp-to-bp-kegiatan-form/pelbank-bp-to-bp-kegiatan-form.component';

@Component({
  selector: 'app-pelbank-bp-to-bp-kegiatan',
  templateUrl: './pelbank-bp-to-bp-kegiatan.component.html',
  styleUrls: ['./pelbank-bp-to-bp-kegiatan.component.scss']
})
export class PelbankBpToBpKegiatanComponent implements OnInit, OnDestroy, OnChanges {
  loading_post: boolean;
  loading: boolean;
  userInfo: ITokenClaim;
  listdata: ITbpdettkeg[];
  dataSelected: ITbpdettkeg;
  @Input() TbpdettSelected: ITbpdett;
  @ViewChild(LookMkegiatanByDpaComponent,{static: true}) LookKegiatan : LookMkegiatanByDpaComponent;
  @ViewChild(PelbankBpToBpKegiatanFormComponent,{static: true}) Form : PelbankBpToBpKegiatanFormComponent;
  @ViewChild('dt', {static:true}) dt: any;
  constructor(
    private service: TbpdettkegService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.TbpdettSelected){
      this.get();
    }
  }

  ngOnInit() {
  }
  callBack(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idtbpdettkeg === e.data.idtbpdettkeg);
      this.listdata = this.listdata.filter(f => f.idtbpdettkeg != e.data.idtbpdettkeg);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    this.loading = true;
    this.listdata = [];
    this.service.gets(this.TbpdettSelected.idtbpdett)
      .subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        } else {
          this.notif.info('Data Kegiatan Tidak Tersedia');
        }
        this.loading = false;
      }, (error) => {
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
  add(){
    this.LookKegiatan.title = 'Tambah Kegiatan';
    this.LookKegiatan.get(this.TbpdettSelected.idtbpNavigation.idunit, '321');
    this.LookKegiatan.showThis = true;
  }
  callBackKegiatan(e: any){
    let paramBody: any = {
      idkeg : e.data_id,
      idtbpdett : this.TbpdettSelected.idtbpdett
    };
    this.loading_post = true;
    this.service.post(paramBody).subscribe(resp => {
      if (resp.ok) {
        this.callBack({
          added: true,
          data: resp.body
        });
        this.notif.success('Input Data Berhasil');
      }
      this.loading_post = false;
    },(error) => {
        this.loading_post = false;
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
  }
  update(e: ITbpdettkeg){
    this.Form.title = 'Ubah Nilai Kegiatan';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idtbpdettkeg : e.idtbpdettkeg,
      nilai : e.nilai
    });
    this.Form.showThis = true;
  }
  delete(e: ITbpdettkeg){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idtbpdettkeg).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idtbpdettkeg !== e.idtbpdettkeg);
              this.notif.success('Data berhasil dihapus');
              if(this.dt) this.dt.reset();
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
    this.dataSelected = null;
    this.TbpdettSelected = null;
    this.listdata = [];
  }
}
