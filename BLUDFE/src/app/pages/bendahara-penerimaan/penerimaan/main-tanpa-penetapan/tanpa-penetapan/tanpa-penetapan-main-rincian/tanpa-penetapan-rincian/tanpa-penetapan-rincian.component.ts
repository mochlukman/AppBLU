import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITbp } from 'src/app/core/interface/itbp';
import { ITbpdetd } from 'src/app/core/interface/itbpdetd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TbpdetdService } from 'src/app/core/services/tbpdetd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { TanpaPenetapanRincianFormComponent } from '../tanpa-penetapan-rincian-form/tanpa-penetapan-rincian-form.component';

@Component({
  selector: 'app-tanpa-penetapan-rincian',
  templateUrl: './tanpa-penetapan-rincian.component.html',
  styleUrls: ['./tanpa-penetapan-rincian.component.scss']
})
export class TanpaPenetapanRincianComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: ITbpdetd[] = [];
  @Input() TbpSelected : ITbp;
  userInfo: ITokenClaim;
  @ViewChild(TanpaPenetapanRincianFormComponent, {static: true}) Form : TanpaPenetapanRincianFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : Subscription;
  index: number;
  dataSelected: ITbpdetd;
  subDataSelected: Subscription;
  constructor(
    private service: TbpdetdService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.indexSubs = this.service._tabIndex.subscribe(resp => {
      this.index = resp;
      if(this.index == 0){
        this.get();
      } else {
        this.listdata = [];
      }
    });
    this.subDataSelected = this.service._dataSelected.subscribe(resp => {
      this.dataSelected = resp;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.TbpSelected;
    if(this.index == 0) this.get();
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idtbpdetd === e.data.idtbpdetd);
      this.listdata = this.listdata.filter(f => f.idtbpdetd != e.data.idtbpdetd);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.TbpSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.TbpSelected.idtbp)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
          }

          this.loading = false;
          this.service.setDataSelected(null);
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
    this.Form.title = 'Tambah Rekening Rincian';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idtbp : this.TbpSelected.idtbp,
      idunit: this.TbpSelected.idunit
    });
    this.Form.showThis = true;
  }
  update(e: ITbpdetd){
    this.Form.forms.patchValue({
      idtbpdetd : e.idtbpdetd,
      idrek : e.idrek,
      idtbp : e.idtbp,
      idnojetra : e.idnojetra,
      nilai : e.nilai
    });
    this.Form.title = 'Ubah Nilai';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ITbpdetd){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idtbpdetd).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idtbpdetd !== e.idtbpdetd);
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
  dataKlick(e: ITbpdetd){
    this.service.setDataSelected(e);
	}
  subTotal(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.TbpSelected = null;
    this.indexSubs.unsubscribe();
    this.service.setDataSelected(null);
    this.subDataSelected.unsubscribe();
  }
}
