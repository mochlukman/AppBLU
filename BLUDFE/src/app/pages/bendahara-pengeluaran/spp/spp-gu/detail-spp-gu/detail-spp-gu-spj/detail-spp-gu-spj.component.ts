import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ISpjspp } from 'src/app/core/interface/ispjspp';
import { ISpp } from 'src/app/core/interface/ispp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpjsppService } from 'src/app/core/services/spjspp.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormSppGuSpjComponent } from '../../form-spp-gu-spj/form-spp-gu-spj.component';
import {LookSpjForSppCheckboxComponent} from 'src/app/shared/lookups/look-spj-for-spp-checkbox/look-spj-for-spp-checkbox.component';

@Component({
  selector: 'app-detail-spp-gu-spj',
  templateUrl: './detail-spp-gu-spj.component.html',
  styleUrls: ['./detail-spp-gu-spj.component.scss']
})
export class DetailSppGuSpjComponent implements OnInit, OnDestroy, OnChanges {
  loading_post: boolean
  loading: boolean;
  listdata: ISpjspp[] = [];
  @Input() SppSelected : ISpp;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : number;
  @ViewChild(LookSpjForSppCheckboxComponent,{static: true}) FormCheckBox : LookSpjForSppCheckboxComponent;
  constructor(
    private sppdetrService: SppdetrService,
    private service: SpjsppService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.sppdetrService._tabIndex.subscribe(resp => {
      this.indexSubs = resp;
        if(this.indexSubs == 0){
          this.get();
        } else {
          this.listdata = [];
        }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.SppSelected;
    if(this.indexSubs == 0) this.get();
  }
  ngOnInit() {
  }
  add(){
    this.FormCheckBox.title = 'Pilih SPJ';
    const params = {
      'Idunit': this.SppSelected.idunit,
      'Idspp': this.SppSelected.idspp,
      'Kdstatus': '42'
    };
    this.FormCheckBox.get(params);
    this.FormCheckBox.showThis = true;
  }
  callbackSpj(e: any[]){
    if(e.length > 0){
      let posts: any = [];
      e.forEach(e => {
        posts.push({
          idspp: this.SppSelected.idspp,
          idspj: e.idspj
        });
      });
      this.loading_post = true;
      this.service.postFromSppBatch(posts).subscribe((resp) => {
        if (resp.ok) {
          this.callback({
            added: true,
            data: resp.body
          });
          this.notif.success('Input Data Berhasil');
        }
        this.loading_post = false;
      }, (error) => {
        this.loading_post = false;
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    } else {
      this.notif.warning('Pilih Data SPJ');
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata = [];
      this.listdata = [...e.data];
      if(this.dt) this.dt.reset();
    }
  }
  get(){
    if(this.SppSelected && this.indexSubs == 0){
      this.loading = true;
      this.listdata = [];
      this.service.getBySpp(this.SppSelected.idspp, '42')
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data SPJ Tidak Tersedia');
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
  delete(e: ISpjspp){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idsppspj).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idsppspj !== e.idsppspj);
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
  totalNilai(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += f.nilai);
    }
    return total;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.SppSelected = null;
    this.indexSubs = 0;
  }
}
