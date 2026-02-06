import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { IDp } from 'src/app/core/interface/idp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { IZkode } from 'src/app/core/interface/izkode';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpService } from 'src/app/core/services/dp.service';
import { ZkodeService } from 'src/app/core/services/zkode.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { DaftarPengujiFormComponent } from './daftar-penguji-form/daftar-penguji-form.component';

@Component({
  selector: 'app-daftar-penguji',
  templateUrl: './daftar-penguji.component.html',
  styleUrls: ['./daftar-penguji.component.scss']
})
export class DaftarPengujiComponent implements OnInit, OnDestroy {
  formFilter: FormGroup;
  initialForm: any;
  userInfo: ITokenClaim;
  dataselected: IDp;
  listdata: any[] = [];
  totalRecords: number;
  loading: boolean;
  listzkode: SelectItem[] = [];
  zkodeSelected: any;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(DaftarPengujiFormComponent,{static: true}) Form: DaftarPengujiFormComponent;
  constructor(
    private zkode: ZkodeService,
    private service: DpService,
    private notif: NotifService,
    private auth: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.formFilter = this.fb.group({
      idxkode: [0, [Validators.required, Validators.min(1)]]
    });
    this.getZkode();
  }

  ngOnInit() {
  }
  getZkode(){
    this.listzkode = [
      {label: 'Pilih', value: null}
    ];
    this.zkode.gets()
      .subscribe(resp => {
        let temp: IZkode[] = [];
        if(resp.length > 0 ){
          temp = resp.filter(f => f.idxkode != 0);
          temp.forEach(e => {
            this.listzkode.push({label: `${e.uraian}`, value: e.idxkode})
          });
        }
      }, (error) => {
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
         this.notif.error(error.error)
        }
      });
  }
  zkodeChange(e: any){
    this.formFilter.patchValue({
      idxkode: e.value
    });
    if(this.dt) this.dt.reset();
    this.dataselected = null;
  }
  gets(event: LazyLoadEvent){
    if(this.formFilter.valid){
      this.loading = true;
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idxkode = this.formFilter.value.idxkode;
      this.service.gets().subscribe(resp => {
        this.totalRecords = resp.totalrecords;
        this.listdata = resp.data;
        this.loading = false;
      }, error => {
        this.loading = false;
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    } else {
      this.notif.warning('Pilih Jenis Rekening');
    }
  }
  callback(e: any){
    if(e.added || e.edited){
      if(this.dt) this.dt.reset();
    }
  }
  add(){
    this.Form.title = 'Tambah Daftar Penguji';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idxkode: this.formFilter.value.idxkode
    });
    this.Form.showThis = true;
  }
  edit(e: IDp){
    this.Form.title = 'Tambah Daftar Penguji';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      iddp : e.iddp,
      nodp : e.nodp,
      idxkode : e.idxkode,
      idttd : e.idttd,
      tgldp : e.tgldp != null ? new Date(e.tgldp) : null,
      tglvalid: e.tglvalid != null ? new Date(e.tglvalid) : null,
      uraian: e.uraian,
    });
    this.Form.showThis = true;
  }
  delete(e: IDp){
    this.notif.confir({
			message: `${e.nodp} - ${e.uraian} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.iddp).subscribe(
					(resp) => {
						if (resp.ok) {
              this.notif.success(`${e.nodp} - ${e.uraian}} Berhasil Dihapus`);
              if(this.dt) this.dt.reset();
              this.dataselected = null;
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
  print(e : IDp){}
  dataKlick(e: IDp){
    this.dataselected = e;
  }
  ngOnDestroy(){
    this.formFilter.reset(this.initialForm);
    this.dataselected = null;
  }
}
