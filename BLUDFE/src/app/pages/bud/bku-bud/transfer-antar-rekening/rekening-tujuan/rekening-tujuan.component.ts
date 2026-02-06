import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBkbkas } from 'src/app/core/interface/ibkbkas';
import { ISts } from 'src/app/core/interface/ists';
import { IStsdett } from 'src/app/core/interface/istsdett';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StstdettService } from 'src/app/core/services/ststdett.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookRekeningBudComponent } from 'src/app/shared/lookups/look-rekening-bud/look-rekening-bud.component';
import { RekeningTujuanFormComponent } from '../rekening-tujuan-form/rekening-tujuan-form.component';

@Component({
  selector: 'app-rekening-tujuan',
  templateUrl: './rekening-tujuan.component.html',
  styleUrls: ['./rekening-tujuan.component.scss']
})
export class RekeningTujuanComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: IStsdett[] = [];
  @Input() StsSelected : ISts;
  userInfo: ITokenClaim;
  @ViewChild(LookRekeningBudComponent, {static: true}) Bud : LookRekeningBudComponent;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : Subscription;
  index: number;
  @ViewChild(RekeningTujuanFormComponent, {static: true}) Form : RekeningTujuanFormComponent;
  constructor(
    private service: StstdettService,
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
    if(changes.StsSelected){
      if(changes.StsSelected.previousValue){
        if(changes.StsSelected.currentValue.idsts != changes.StsSelected.previousValue.idsts){
          this.get();
          }
      } else {
        this.get();
      }
    }
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(...[e.data]);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idstsdett === e.data.idstsdett);
      this.listdata = this.listdata.filter(f => f.idstsdett != e.data.idstsdett);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.StsSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.StsSelected.idsts)
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
    let noBantuselected = this.listdata.map(m => m.nobbantu.trim());
    this.Bud.title = 'Pilih Rekening BUD';
    this.Bud.NoBantu = this.StsSelected.nobbantuNavigation.nobbantu;
    this.Bud.listNobantuSelected = noBantuselected;
    this.Bud.Idunit = this.StsSelected.idunit;
    this.Bud.gets();
    this.Bud.showThis = true;
  }
  callBackBud(e: IBkbkas){
    const post = {
      idsts : this.StsSelected.idsts,
      nobbantu : e.nobbantu,
      nilai : 0
    }
    this.service.post(post).subscribe(resp => {
      if(resp.ok){
        this.callback({
          added: true,
          data: resp.body
        });
      }
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
  update(e: IStsdett){
    this.Form.forms.patchValue({
      idstsdett : e.idstsdett,
      nilai : e.nilai
    });
    this.Form.title = 'Ubah Nilai';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IStsdett){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idstsdett).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idstsdett !== e.idstsdett);
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
  ngOnDestroy(): void {
    this.listdata = [];
    this.StsSelected = null;
    this.indexSubs.unsubscribe();
  }
}

