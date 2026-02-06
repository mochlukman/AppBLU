import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISpp } from 'src/app/core/interface/ispp';
import { ISppdetrData, ISppdetrTreeRoot } from 'src/app/core/interface/isppdetr';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormDetailSppPengajuanTuComponent } from '../../form-detail-spp-pengajuan-tu/form-detail-spp-pengajuan-tu.component';
import { FormSppPengajuanTuNilaiComponent } from '../../form-spp-pengajuan-tu-nilai/form-spp-pengajuan-tu-nilai.component';

@Component({
  selector: 'app-detail-spp-pengajuan-tu-pembebanan',
  templateUrl: './detail-spp-pengajuan-tu-pembebanan.component.html',
  styleUrls: ['./detail-spp-pengajuan-tu-pembebanan.component.scss']
})
export class DetailSppPengajuanTuPembebananComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: ISppdetrTreeRoot[] = [];
  @Input() SppSelected : ISpp;
  userInfo: ITokenClaim;
  @ViewChild(FormDetailSppPengajuanTuComponent, {static: true}) Form : FormDetailSppPengajuanTuComponent;
  @ViewChild(FormSppPengajuanTuNilaiComponent, {static: true}) FormNilai: FormSppPengajuanTuNilaiComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private service: SppdetrService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.SppSelected;
    if(this.tabIndex == 0) {
      this.get();
    } else {
      this.listdata = [];
    }
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.get();
    } else if(e.edited){
      // let index = this.listdata.findIndex(f => f.idsppdetr === e.data.idsppdetr);
      // this.listdata = this.listdata.filter(f => f.idsppdetr != e.data.idsppdetr);
      // this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    } else if(e.put_nilai){
      this.listdata.forEach(f => {
        f.children.forEach(c => {
          if(c.data.idsppdetr == e.data.idsppdetr) c.data.nilai = e.data.nilai;
        });
      });
      let temp: ISppdetrTreeRoot[] = Object.assign(this.listdata); 
      temp.forEach(a => {
        let temp_total_nilai = 0;
        if(a.children.length > 0){
          a.children.forEach(b => {
            temp_total_nilai += b.data.nilai;
          });
          a.data.nilai = temp_total_nilai;
        }
      });
      this.listdata = [...temp];
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.SppSelected){
      this.loading = true;
      this.listdata = [];
      this.service.getsTreeTable(this.SppSelected.idspp)
        .subscribe(resp => {
          if(resp.length > 0){
            let temp: ISppdetrTreeRoot[] = Object.assign(resp); 
            temp.forEach(a => {
              let temp_total_nilai = 0;
              if(a.children.length > 0){
                a.children.forEach(b => {
                  temp_total_nilai += b.data.nilai;
                });
                a.data.nilai += temp_total_nilai;
              }
            });
            this.listdata = [...temp];
          } else {
            this.notif.info('Data Rekening Tidak Tersedia');
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
    this.Form.title = 'Tambah';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idunit: this.SppSelected.idunit,
      idspp: this.SppSelected.idspp,
      idnojetra: 21,
      kdtahap: '321',
      idxkode: 2,
      kdstatus: '23'
    });
    this.Form.showThis = true;
  }
  updateNilai(e: ISppdetrData){
    this.FormNilai.forms.patchValue({
      idsppdetr : e.idsppdetr,
      nilai : e.nilai
    });
    this.FormNilai.title = `Ubah Nilai ${e.uraian}`;
    this.FormNilai.showThis = true;
  }
  delete(e: ISppdetrData){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idsppdetr).subscribe(
					(resp) => {
						if (resp.ok) {
              let temp: ISppdetrTreeRoot[] = Object.assign(this.listdata);
              this.listdata = [];
              for(let i = 0; i < temp.length; i++){
                temp[i].children = temp[i].children.filter(f => f.data.rowid != e.rowid);
              }
              temp.forEach(a => {
                let temp_total_nilai = 0;
                if(a.children.length > 0){
                  a.children.forEach(b => {
                    temp_total_nilai += b.data.nilai;
                  });
                  a.data.nilai = temp_total_nilai;
                }
              });
              this.listdata = [...temp];
              let rowid = e.rowid.split('_');
              let keg: ISppdetrTreeRoot = this.listdata.find(f => f.data.rowid == rowid[0]);
              if(keg.children.length == 0){
                this.listdata = this.listdata.filter(f => f.data.rowid != keg.data.rowid);
              }
              if(this.dt) this.dt.reset();
              this.notif.success('Data berhasil dihapus');
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
    this.SppSelected = null;
  }
}
