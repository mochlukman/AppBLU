import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { IRkad, IRkadetd } from 'src/app/core/interface/irkad';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { RkadetdService } from 'src/app/core/services/rkadetd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { RkadetdFormxComponent } from './rkadetd-formx/rkadetd-formx.component';

@Component({
  selector: 'app-rka-dpenjabaranx',
  templateUrl: './rka-dpenjabaranx.component.html',
  styleUrls: ['./rka-dpenjabaranx.component.scss']
})
export class RkaDpenjabaranxComponent implements OnInit, OnDestroy, OnChanges {
  loading: boolean;
  listdata: IRkadetd[] = [];
  userInfo: ITokenClaim;
  totalRecords: number;
  @Input() rkaSelected: IRkad;
  @ViewChild('dt', { static: false }) dt: any;
  @ViewChild(RkadetdFormxComponent, { static: true }) Form: RkadetdFormxComponent;
  @Output() callbackChild = new EventEmitter();
  totalNilai: number = 0;
  @Input() isvalid : boolean = false;
  constructor(
    private service: RkadetdService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rkaSelected) {
      if (changes.rkaSelected.firstChange && changes.rkaSelected.currentValue) {
        if (this.dt) this.dt.reset();
      } else {
        if (changes.rkaSelected.currentValue != changes.rkaSelected.previousValue) {
          if (this.dt) this.dt.reset();
        }
      }
    }
  }

  ngOnInit() {
  }
  callback(e: any) {
    if (e.added || e.edited) {
      this.callbackChild.emit(e.data);
      if (this.dt) this.dt.reset();
    }
    this.subTotal();
  }
  gets(event: LazyLoadEvent) {
    if (this.rkaSelected) {
      if (this.loading) this.loading = true;
      this.listdata = [];
      this.totalNilai = 0;
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idrkad = this.rkaSelected.idrkad;
      this.service.paging().subscribe(resp => {
        if (resp.totalrecords > 0) {
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
          if (resp.optionalResult) {
            this.totalNilai = resp.optionalResult.totalNilai;
          }
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
  add() {
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idrkad: this.rkaSelected.idrkad,
    });
    this.Form.showThis = true;
  }
  addSub(e: IRkadetd) {
    this.Form.title = 'Tambah Sub Data';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idrkad: this.rkaSelected.idrkad,
      kdjabar: `${e.kdjabar.trim()}xx.`,
      type: 'D',
      idrkadetdduk: e.idrkadetd
    });
    this.Form.showThis = true;
  }
  edit(e: IRkadetd) {
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idrkadetd: e.idrkadetd,
      idrkad: e.idrkad,
      kdjabar: e.kdjabar,
      uraian: e.uraian,
      satuan: e.satuan,
      tarif: e.tarif,
      ekspresi: e.ekspresi,
      type: e.type.trim(),
      idrkadetdduk: e.idrkadetdduk,
    });
    this.Form.showThis = true;
  }
  delete(e: IRkadetd) { 
    this.notif.confir({
			message: `${e.uraian} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idrkadetd).subscribe(
					(resp) => {
						if (resp.ok) {
              this.callbackChild.emit(resp.body);
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
  subTotal(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => {
        if(f.type.trim() == 'D'){
          total += +f.subtotal;
        }
      });
		}
		return total;
  }
  ngOnDestroy(): void {
    this.totalNilai = 0;
  }
}
