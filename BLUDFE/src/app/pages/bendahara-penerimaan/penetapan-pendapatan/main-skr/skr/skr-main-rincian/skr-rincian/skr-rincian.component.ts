import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISkp } from 'src/app/core/interface/iskp';
import { ISkpdet } from 'src/app/core/interface/iskpdet';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SkpdetService } from 'src/app/core/services/skpdet.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { SkrRincianFormComponent } from '../skr-rincian-form/skr-rincian-form.component';

@Component({
  selector: 'app-skr-rincian',
  templateUrl: './skr-rincian.component.html',
  styleUrls: ['./skr-rincian.component.scss']
})
export class SkrRincianComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: ISkpdet[] = [];
  @Input() SkpSelected : ISkp;
  userInfo: ITokenClaim;
  @ViewChild(SkrRincianFormComponent, {static: true}) Form : SkrRincianFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : Subscription;
  index: number;
  dataSelected: ISkpdet;
  subDataSelected: Subscription;
  constructor(
    private service: SkpdetService,
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
    this.SkpSelected;
    if(this.index == 0) this.get();
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idskpdet === e.data.idskpdet);
      this.listdata = this.listdata.filter(f => f.idskpdet != e.data.idskpdet);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.SkpSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.SkpSelected.idskp)
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
      idskp : this.SkpSelected.idskp,
      idunit: this.SkpSelected.idunit
    });
    this.Form.showThis = true;
  }
  update(e: ISkpdet){
    this.Form.forms.patchValue({
      idskpdet : e.idskpdet,
      idrek : e.idrek,
      idskp : e.idskp,
      idnojetra : e.idnojetra,
      nilai : e.nilai
    });
    this.Form.title = 'Ubah Nilai';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISkpdet){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idskpdet).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idskpdet !== e.idskpdet);
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
  dataKlick(e: ISkpdet){
    this.service.setDataSelected(e);
	}
  ngOnDestroy(): void {
    this.listdata = [];
    this.SkpSelected = null;
    this.indexSubs.unsubscribe();
    this.service.setDataSelected(null);
    this.subDataSelected.unsubscribe();
  }
}