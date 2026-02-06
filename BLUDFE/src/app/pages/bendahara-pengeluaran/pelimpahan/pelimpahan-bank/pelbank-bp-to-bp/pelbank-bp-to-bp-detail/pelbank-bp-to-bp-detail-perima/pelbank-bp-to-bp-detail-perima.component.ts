import { Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITbp } from 'src/app/core/interface/itbp';
import { ITbpdett } from 'src/app/core/interface/itbpdett';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TbpdettService } from 'src/app/core/services/tbpdett.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { PelbankBpToBpDetailPerimaFormComponent } from '../pelbank-bp-to-bp-detail-perima-form/pelbank-bp-to-bp-detail-perima-form.component';

@Component({
  selector: 'app-pelbank-bp-to-bp-detail-perima',
  templateUrl: './pelbank-bp-to-bp-detail-perima.component.html',
  styleUrls: ['./pelbank-bp-to-bp-detail-perima.component.scss']
})
export class PelbankBpToBpDetailPerimaComponent implements OnInit, OnDestroy {
  loading: boolean;
  listdata: ITbpdett[] = [];
  @Input() TbpSelected : ITbp;
  userInfo: ITokenClaim;
  @ViewChild(PelbankBpToBpDetailPerimaFormComponent, {static: true}) Form : PelbankBpToBpDetailPerimaFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : Subscription;
  index: number;
  dataSelected: ITbpdett;
  constructor(
    private service: TbpdettService,
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
      let index = this.listdata.findIndex(f => f.idtbpdett === e.data.idtbpdett);
      this.listdata = this.listdata.filter(f => f.idtbpdett != e.data.idtbpdett);
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
          this.listdata = [...resp];
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
    this.Form.title = 'Tambah Penerima';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idtbp : this.TbpSelected.idtbp,
      idunit: this.TbpSelected.idunit,
    });
    if(this.listdata.length > 0){
      this.Form.listBendExist = this.listdata.map(m => m.idbend);
    }
    this.Form.showThis = true;
  }
  update(e: ITbpdett){
    this.Form.forms.patchValue({
      idtbpdett : e.idtbpdett,
      idtbp : e.idtbp,
      idbend : e.idbend,
      nilai : e.nilai
    });
    this.Form.title = 'Ubah Nilai';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ITbpdett){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idtbpdett).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idtbpdett !== e.idtbpdett);
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
  dataKlick(e: ITbpdett){
    this.dataSelected = e;
	}
  ngOnDestroy(): void {
    this.listdata = [];
    this.TbpSelected = null;
    this.indexSubs.unsubscribe();
    this.service.setDataSelected(null);
  }
}
