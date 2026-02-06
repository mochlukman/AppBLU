import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ITagihan, ITagihandet} from 'src/app/core/interface/itagihan';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {Subscription} from 'rxjs';
import {TagihanService} from 'src/app/core/services/tagihan.service';
import {TagihandetService} from 'src/app/core/services/tagihandet.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {
  TagihanPembuatanDetailFormComponent
} from 'src/app/pages/bendahara-pengeluaran/manajemen-proyek/tagihan/tagihan-pembuatan/tagihan-pembuatan-detail/tagihan-pembuatan-detail-form/tagihan-pembuatan-detail-form.component';

@Component({
  selector: 'app-tagihan-pembuatan-detail',
  templateUrl: './tagihan-pembuatan-detail.component.html',
  styleUrls: ['./tagihan-pembuatan-detail.component.scss']
})
export class TagihanPembuatanDetailComponent implements OnInit, OnDestroy, OnChanges {
  loading: boolean;
  listdata: ITagihandet[] = [];
  dataSelected : ITagihandet = null;
  userInfo: ITokenClaim;
  @Input() tagihanSelected: ITagihan;
  sub_tagihan: Subscription;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(TagihanPembuatanDetailFormComponent,{static: true}) Form : TagihanPembuatanDetailFormComponent;
  constructor(
    private service: TagihandetService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.tagihanSelected;
    this.get();
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idtagihandet === e.data.idtagihandet);
      this.listdata = this.listdata.filter(f => f.idtagihandet != e.data.idtagihandet);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
    this.dt.reset();
  }
  get(){
    if(this.tagihanSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.tagihanSelected.idtagihan)
        .subscribe(resp => {
          if(resp.length){
            this.listdata = [...resp]
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
    } else {
      this.listdata = [];
    }
  }
  totalNilai(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += f.nilai);
    }
    return total;
  }
  rekKlik(e: ITagihandet){
    this.dataSelected = e;
  }
  add(){
    this.Form.title = 'Tambah';
    this.Form.mode = 'add';
    this.Form.tagihanSelected = this.tagihanSelected;
    this.Form.forms.patchValue({
      idtagihan: this.tagihanSelected.idtagihan
    });
    this.Form.showThis = true;
  }
  update(e: ITagihandet){
    this.Form.title = 'Ubah Nilai';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idtagihandet : e.idtagihandet,
      idtagihan : e.idtagihan,
      idrek : e.idrek,
      nilai : e.nilai
    });
    if(e.rekening){
      this.Form.uiRek = {kode: e.rekening.kdper, nama: e.rekening.nmper};
    }
    this.Form.showThis = true;
  }
  delete(e: ITagihandet){
    this.notif.confir({
      message: `${e.rekening.kdper} - ${e.rekening.nmper} Akan Dihapus`,
      accept: () => {
        this.service.delete(e.idtagihandet).subscribe(
          (resp) => {
            if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idtagihandet !== e.idtagihandet);
              this.listdata.sort((a,b) =>  (a.idrek > b.idrek ? 1 : -1));
              this.notif.success('Data berhasil dihapus');
              this.dt.reset();
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
  ngOnDestroy() : void {
    this.dataSelected = null;
    this.listdata = [];
  }
}
