import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IBpkpajak} from 'src/app/core/interface/ibpkpajak';
import {Message} from 'primeng/api';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {IBpkpajakdet} from 'src/app/core/interface/ibpkpajakdet';
import {BpkpajakdetService} from 'src/app/core/services/bpkpajakdet.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {
  PembuatanBpkPungutanPajakDetFormComponent
} from 'src/app/pages/bendahara-dana-bok/bpk/bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-pungutan-pajak/pembuatan-bpk-pungutan-pajak-det-form/pembuatan-bpk-pungutan-pajak-det-form.component';
import {IBpk} from 'src/app/core/interface/ibpk';

@Component({
  selector: 'app-pembuatan-bpk-pungutan-pajak-det',
  templateUrl: './pembuatan-bpk-pungutan-pajak-det.component.html',
  styleUrls: ['./pembuatan-bpk-pungutan-pajak-det.component.scss']
})
export class PembuatanBpkPungutanPajakDetComponent implements OnInit {
  @Input() BpkSelected: IBpk;
  BpkpajakSelected: IBpkpajak;
  showThis: boolean;
  loading: boolean;
  title: string;
  mode: string;
  msg: Message[];
  indoKalender: any;
  userInfo: ITokenClaim;
  @Output() callback = new EventEmitter();
  listdata: IBpkpajakdet[] = [];
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(PembuatanBpkPungutanPajakDetFormComponent,{static: true}) Form : PembuatanBpkPungutanPajakDetFormComponent;
  constructor(
    private service: BpkpajakdetService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(){
    if(this.BpkpajakSelected){
      this.loading = true;
      this.listdata = [];
      this.service._idbpkpajak = this.BpkpajakSelected.idbpkpajak;
      this.service.gets().subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
          this.callback.emit({
            idbpkpajak: this.BpkpajakSelected.idbpkpajak,
            nilai: this.listdata.map(m => m.nilai).reduce((prev, next) => prev + next) // jumlahkan Nilai
          });
        } else {
          this.msg = [];
        }
        this.loading = false;
      }, error => {
        this.msg = [];
        this.loading = false;
        if (Array.isArray(error.error.error)) {
          for (var i = 0; i < error.error.error.length; i++) {
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
      });
    }
  }
  callbackPost(e: any){
    if(e.added){
      this.gets();
    } else if(e.edited){
      this.gets();
      this.msg = [];
      this.msg.push({severity: 'success', summary: 'Berhasil', detail: 'Data Berhasil Diubah'});
      setTimeout(() => {
        this.msg = [];
      }, 3000);
    }
  }
  add(){
    if(this.BpkpajakSelected.idbpkpajak){
      this.Form.title = 'Tambah Rincian Pajak';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idbpkpajak: this.BpkpajakSelected.idbpkpajak
      });
      this.Form.showThis = true;
    }
  }
  edit(e: IBpkpajakdet){
    this.Form.title = 'Ubah Rincian Pajak';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idbpkpajakdet :  e.idbpkpajakdet,
      idbpkpajak :  e.idbpkpajak,
      idpajak :  e.idpajak,
      nilai :  e.nilai,
      idbilling :  e.idbilling,
      tglbilling :  e.tglbilling !== null ? new Date(e.tglbilling) : new Date(),
      ntpn :  e.ntpn,
      ntb :  e.ntb
    });
    if(e.idpajakNavigation){
      this.Form.uiPajak = {kode : e.idpajakNavigation.kdpajak, nama: e.idpajakNavigation.nmpajak};
      this.Form.pajakSelected = e.idpajakNavigation;
    }
    this.Form.isvalid = this.BpkSelected.valid;
    this.Form.showThis = true;
  }
  delete(e: IBpkpajakdet){
    this.notif.confir({
      message: ``,
      accept: () => {
        this.loading = true;
        this.service.delete(e.idbpkpajakdet).subscribe(
          (resp) => {
            if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idbpkpajakdet !== e.idbpkpajakdet);
              this.msg = [];
              this.msg.push({severity: 'success', summary: 'Berhasil', detail: 'Data Berhasil Dihapus'});
              if(this.dt) this.dt.reset();
              setTimeout(() => {
                this.msg = [];
              }, 3000);
              this.callback.emit({
                idbpkpajak: this.BpkpajakSelected.idbpkpajak,
                nilai: this.listdata.map(m => m.nilai).reduce((prev, next) => prev + next) // jumlahkan Nilai
              });
            }
            this.loading = false;
          }, (error) => {
            this.msg = [];
            this.loading = false;
            if (Array.isArray(error.error.error)) {
              for (var i = 0; i < error.error.error.length; i++) {
                this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
              }
            } else {
              this.msg.push({severity: 'error', summary: 'error', detail: error.error});
            }
          });
      },
      reject: () => {
        return false;
      }
    });
  }
  onShow(){
    this.gets();
  }
  onHide(){
    this.listdata = [];
    this.msg = [];
    this.BpkpajakSelected = undefined;
    this.showThis = false;
  }
}
