import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MappingKorolariService } from 'src/app/core/services/mapping-korolari.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { AssetTetapKorolariRekeningFormComponent } from '../asset-tetap-korolari-rekening-form/asset-tetap-korolari-rekening-form.component';

@Component({
  selector: 'app-asset-tetap-korolari-form',
  templateUrl: './asset-tetap-korolari-form.component.html',
  styleUrls: ['./asset-tetap-korolari-form.component.scss']
})
export class AssetTetapKorolariFormComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  loading_post: boolean;
  uiRek: IDisplayGlobal;
  rekSelected: IDaftrekening | null;
  kdpers: string = '';
  userInfo: ITokenClaim;
  listExist: number[] = [];
  idrekaset: number;
  @Output() callback = new EventEmitter();
  @ViewChild(AssetTetapKorolariRekeningFormComponent, {static: true}) rekening: AssetTetapKorolariRekeningFormComponent;
  constructor(
    private auth: AuthenticationService,
    private service: MappingKorolariService,
    private notif: NotifService) {
      this.userInfo = this.auth.getTokenInfo();
      this.uiRek = {kode: '', nama: ''};
    }

  ngOnInit() {
  }
  lookrek(){
    this.rekening.title = 'Pilih Rekening';
    this.rekening.idrekaset = this.idrekaset;
    this.rekening.listExist = this.listExist;
    this.rekening.showThis = true;
  }
  callbackrek(e: any){
    if(e){
      this.rekSelected = e;
      this.uiRek = {kode: this.rekSelected.kdper.trim(), nama: this.rekSelected.nmper.trim()};
    }
  }
  simpan(){
    if(this.rekSelected && this.kdpers != ''){
      let postbody = {
        idrek: this.idrekaset,
        kdpers: this.kdpers,
        idreknrc: [this.rekSelected.idrek]
      }
      this.loading_post = true;
        this.service.post(postbody).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              added: true
            });
            this.onHide();
            this.notif.success('Input Data Berhasil');
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
    } else {
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Lengkapi Form'});
    }
  }
  onShow(){
  }
  onHide(){
    this.title = '';
    this.showThis = false;
    this.listExist = [];
    this.msg = [];
    this.uiRek = {kode: '', nama: ''};
    this.rekSelected = null;
    this.kdpers = '';
  }
}
