import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IBpkpajak } from 'src/app/core/interface/ibpkpajak';
import { IBpkpajakstr } from 'src/app/core/interface/ibpkpajakstr';
import { IBpkpajakstrdet } from 'src/app/core/interface/ibpkpajakstrdet';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkpajakstrdetService } from 'src/app/core/services/bpkpajakstrdet.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookPungutanPajakCheckboxComponent } from 'src/app/shared/lookups/look-pungutan-pajak-checkbox/look-pungutan-pajak-checkbox.component';
import { PenyetoranPajakRincianDetailFormComponent } from './penyetoran-pajak-rincian-detail-form/penyetoran-pajak-rincian-detail-form.component';
import {
  PembuatanBpkPungutanPajakDetComponent
} from 'src/app/pages/bendahara-pengeluaran/bpk/bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-pungutan-pajak/pembuatan-bpk-pungutan-pajak-det/pembuatan-bpk-pungutan-pajak-det.component';

@Component({
  selector: 'app-penyetoran-pajak-rincian-detail',
  templateUrl: './penyetoran-pajak-rincian-detail.component.html',
  styleUrls: ['./penyetoran-pajak-rincian-detail.component.scss']
})
export class PenyetoranPajakRincianDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0
  loading: boolean;
  listdata: IBpkpajakstrdet[] = [];
  totalRecords: number = 0;
  @Input() bpkpajakstrSelected : IBpkpajakstr;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: any | null = null;
  @Output() callback = new EventEmitter();
  @ViewChild(PenyetoranPajakRincianDetailFormComponent, {static: true}) Form: PenyetoranPajakRincianDetailFormComponent;
  @ViewChild(LookPungutanPajakCheckboxComponent, {static: true}) BpkPajak: LookPungutanPajakCheckboxComponent;
  @ViewChild(PembuatanBpkPungutanPajakDetComponent, {static: true}) Bpkdet: PembuatanBpkPungutanPajakDetComponent;
  constructor(
    private service: BpkpajakstrdetService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 0){
      this.gets();
    } else {
      this.ngOnDestroy();
    }
  }
  ngOnInit() {
  }
  gets(){
    if(this.bpkpajakstrSelected){
      this.loading = true;
      this.listdata = [];
      this.dataSelected = null;
      this.service._idbpkpajakstr = this.bpkpajakstrSelected.idbpkpajakstr;
      this.service.gets().subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
          this.sumNilai();
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
        this.loading = false;
      }, error => {
        this.loading = false;
        if (Array.isArray(error.error.error)) {
          for (var i = 0; i < error.error.error.length; i++) {
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
  }
  callbackPost(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      this.sumNilai();
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      this.listdata.splice(this.listdata.findIndex(i => i.idbpkpajakstrdet === e.data.idbpkpajakstrdet), 1, e.data);
      this.notif.success('Data Berhasil Diubah');
      this.sumNilai();
    }
  }
  sumNilai(){
    if(this.listdata.length > 0){
      this.callback.emit({
        idbpkpajakstr: this.bpkpajakstrSelected.idbpkpajakstr,
        nilai: this.listdata.map(m => m.nilai).reduce((prev, next) => prev + next) // jumlahkan Nilai
      });
    } else {
      this.callback.emit({
        idbpkpajakstr: this.bpkpajakstrSelected.idbpkpajakstr,
        nilai: 0
      });
    }
  }
  callbackForm(e: IBpkpajak[]){
    if(e.length > 0){
      let idbpkpajaks = e.map(m => m.idbpkpajak);
      let postBody = {
        idbpkpajakstr : this.bpkpajakstrSelected.idbpkpajakstr,
        idbpkpajak: idbpkpajaks
      };
      this.loading = true;
      this.service.post(postBody).subscribe(resp => {
        if(resp.ok){
          this.callbackPost({
            data: resp.body,
            added: true
          });
          this.notif.success('Data Berhasil Ditambahkan');
        }
        this.loading = false;
      }, error => {
        this.loading = false;
        if (Array.isArray(error.error.error)) {
          for (var i = 0; i < error.error.error.length; i++) {
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
  }
  add(){
    this.BpkPajak.title = 'Pilih Pemungutan Pajak';
    this.BpkPajak._idunit = this.bpkpajakstrSelected.idunit;
    this.BpkPajak._idbend = this.bpkpajakstrSelected.idbend;
    this.BpkPajak._idbpkpajakstr = this.bpkpajakstrSelected.idbpkpajakstr;
    this.BpkPajak.gets();
    this.BpkPajak.showThis = true;
  }
  edit(e: IBpkpajakstrdet){
    this.Form.title = `Ubah Nilai ${e.idbpkpajakNavigation.uraian}`;
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idbpkpajakstrdet : e.idbpkpajakstrdet,
      nilai : e.nilai
    });
    this.Form.showThis = true;
  }
  delete(e: IBpkpajakstrdet){
    this.notif.confir({
			message: ``,
			accept: () => {
        this.loading = true;
				this.service.delete(e.idbpkpajakstrdet).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idbpkpajakstrdet !== e.idbpkpajakstrdet);
              this.sumNilai();
              this.notif.success('Data Berhasil Dihapus');
              if(this.dt) this.dt.reset();
						}
            this.loading = false;
					}, (error) => {
            this.loading = false;
            if (Array.isArray(error.error.error)) {
              for (var i = 0; i < error.error.error.length; i++) {
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
  callbackdet(e: any){
    this.listdata.map(m => {
      if(m.idbpkpajak == e.idbpkpajak){
        m.nilai = e.nilai;
      }
    });
  }
  dataClick(e: any){
    this.dataSelected = e;
    this.Bpkdet.title = `Rincian Pungutan Pajak`;
    this.Bpkdet.BpkpajakSelected = this.dataSelected;
    this.Bpkdet.showThis = true;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.dataSelected = null;
    this.totalRecords = 0;
  }
}
