import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsdetrService } from 'src/app/core/services/stsdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { PopupLoadingComponent } from 'src/app/shared/Component/popup-loading/popup-loading.component';
import { RincianBelanjaFormComponent } from './rincian-belanja-form/rincian-belanja-form.component';

@Component({
  selector: 'app-rincian-belanja',
  templateUrl: './rincian-belanja.component.html',
  styleUrls: ['./rincian-belanja.component.scss']
})
export class RincianBelanjaComponent implements OnInit {
  @Input() stsselected: any;
  loading: boolean;
  listdata: any[] = [];
  userInfo: ITokenClaim;
  @ViewChild(RincianBelanjaFormComponent, {static: true}) Forms: RincianBelanjaFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: any;
  rowGroupMetadata: any;
  constructor(
    private service: StsdetrService,
    private authService: AuthenticationService,
    private notif: NotifService,
    private dialog: DialogService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.get();
  }
  ngOnInit() {
  }
  callback(e: any){
    this.get();
  }
  get(){
    if(this.stsselected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.stsselected.idsts)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
            this.updateRowGroupMetaData();
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
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.listdata) {
        for (let i = 0; i < this.listdata.length; i++) {
            let rowData = this.listdata[i];
            let idkeg = rowData.idkeg;
            if (i == 0) {
                this.rowGroupMetadata[idkeg] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.listdata[i - 1];
                let previousRowGroup = previousRowData.idkeg;
                if (idkeg === previousRowGroup)
                    this.rowGroupMetadata[idkeg].size++;
                else
                    this.rowGroupMetadata[idkeg] = { index: i, size: 1 };
            }
        }
    }
  }
  add(){
    this.Forms.title = 'Tambah Rincian Pengembalian Belanja';
    this.Forms.mode = 'add';
    this.Forms.stsSelected = this.stsselected;
    this.Forms.forms.patchValue({
      idsts: this.stsselected.idsts
    });
    this.Forms.showThis = true;
  }
  update(e: any){
    this.Forms.title = 'Ubah Rincian Pengembalian Belanja';
    this.Forms.mode = 'edit';
    this.Forms.stsSelected = this.stsselected;
    this.Forms.forms.patchValue({
      idstsdetr: e.idstsdetr,
      idsts: e.idsts,
      idkeg: e.idkeg,
      idrek: e.idrek,
      idnojetra: e.idnojetra,
      nilai: e.nilai,
    });
    if(e.idkegNavigation){
      this.Forms.uiKeg = {kode: e.idkegNavigation.nukeg, nama: e.idkegNavigation.nmkegunit};
    }
    if(e.idrekNavigation){
      this.Forms.uiRek = {kode: e.idrekNavigation.kdper, nama: e.idrekNavigation.nmper};
    }
    this.Forms.showThis = true;
  }
  delete(e: any){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idstsdetr).subscribe(
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