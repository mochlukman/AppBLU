import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISpd, ISpddetrData, ISpddetrTreeRoot } from 'src/app/core/interface/ispd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpddetrService } from 'src/app/core/services/spddetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormSpdBelanjaNilaiComponent } from '../../form-spd-belanja-nilai/form-spd-belanja-nilai.component';

@Component({
  selector: 'app-rincian-spd',
  templateUrl: './rincian-spd.component.html',
  styleUrls: ['./rincian-spd.component.scss']
})
export class RincianSpdComponent implements OnInit, OnDestroy, OnChanges {
  listdata: ISpddetrTreeRoot[] = [];
  @Input() SpdSelected : ISpd;
  @ViewChild('dt',{static:false}) dt: any;
  userInfo: ITokenClaim;
  indexSubs : Subscription;
  loading: boolean;
  index: number;
  @ViewChild(FormSpdBelanjaNilaiComponent, {static: true}) FormNilai: FormSpdBelanjaNilaiComponent;
  constructor(
    private service: SpddetrService,
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
    this.SpdSelected;
    if(this.index == 0) this.get()
  }
  ngOnInit() {
  }
  
  callback(e: any){
    if(e.added){
      this.get();
    } else if(e.put_nilai){
      this.listdata.forEach(f => {
        f.children.forEach(c => {
          if(c.data.idspddetr == e.data.idspddetr) c.data.nilai = e.data.nilai;
        });
      });
      let temp: ISpddetrTreeRoot[] = Object.assign(this.listdata); 
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
    if(this.SpdSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service.getsTreeTable(this.SpdSelected.idspd)
        .subscribe(resp => {
          if(resp.length){
            let temp: ISpddetrTreeRoot[] = Object.assign(resp); 
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
        }, error => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    }
  }
  updateNilai(e: ISpddetrData){
    this.FormNilai.forms.patchValue({
      idspddetr : e.idspddetr,
      nilai : e.nilai
    });
    this.FormNilai.title = `Ubah Nilai ${e.uraian}`;
    this.FormNilai.showThis = true;
  }
  delete(e: ISpddetrData){
    this.notif.confir({
			message: `${e.uraian} Akan Dihapus?`,
			accept: () => {
				this.service.delete(e.idspddetr).subscribe(
					(resp) => {
						if (resp.ok) {
              let temp: ISpddetrTreeRoot[] = Object.assign(this.listdata);
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
              let keg: ISpddetrTreeRoot = this.listdata.find(f => f.data.rowid == rowid[0]);
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
    this.indexSubs.unsubscribe();
  }
}
