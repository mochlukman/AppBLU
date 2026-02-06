import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {InputRupiahPipe} from 'src/app/core/pipe/input-rupiah.pipe';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {DaftreklakService} from 'src/app/core/services/daftreklak.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-arus-kas',
  templateUrl: './arus-kas.component.html',
  styleUrls: ['./arus-kas.component.scss'],
  providers: [InputRupiahPipe]
})
export class ArusKasComponent implements OnInit, OnDestroy {
  title: string = '';
  loading: boolean;
  listdata: any[] = [];
  dataselected: any | null;
  userInfo: ITokenClaim;
  nilaiInit: number;
  @ViewChild('dt', {static: false}) dt: any;

  constructor(
    private service: DaftreklakService,
    private notif: NotifService,
    private authService: AuthenticationService,
    private global: GlobalService,
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.global._title.subscribe(resp => this.title = resp);
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.loading = true;
    this.listdata = [];
    this.service.gets().subscribe(resp => {
      if (resp.length > 0) {
        this.listdata = [...resp];
      } else {
        this.notif.info('Data Tidak Tersedia');
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      if (Array.isArray(error.error.error)) {
        for (var i = 0; i < error.error.error; i++) {
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    });
  }

  onRowEditInit(e: any) {
    this.nilaiInit = e.nlakawal;
  }

  onRowEditSave(e: any) {
    this.service.updateNilai(e).subscribe(resp => {
      if (resp.ok) {
        this.notif.success('Data Berhasil Diubah');
      }
    }, (error) => {
      this.loading = false;
      if (Array.isArray(error.error.error)) {
        for (var i = 0; i < error.error.error; i++) {
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    });
  }

  onRowEditCancel(e: any, index: number) {
    this.listdata.map(m => {
      if (m.idrek == e.idrek) {
        m.nlakawal = this.nilaiInit;
      }
    });
  }

  ngOnDestroy(): void {
    this.listdata = [];
    this.loading = false;
  }
}
