import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsdetrService } from 'src/app/core/services/stsdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pengesahan-rincian-belanja',
  templateUrl: './pengesahan-rincian-belanja.component.html',
  styleUrls: ['./pengesahan-rincian-belanja.component.scss']
})
export class PengesahanRincianBelanjaComponent implements OnInit {
  @Input() stsselected: any;
  loading: boolean;
  listdata: any[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: any;
  rowGroupMetadata: any;
  constructor(
    private service: StsdetrService,
    private authService: AuthenticationService,
    private notif: NotifService
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
}