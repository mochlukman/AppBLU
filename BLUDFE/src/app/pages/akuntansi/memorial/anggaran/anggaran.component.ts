import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { IfService } from 'src/app/core/services/if.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { AnggaranFormComponent } from './anggaran-form/anggaran-form.component';

@Component({
  selector: 'app-anggaran',
  templateUrl: './anggaran.component.html',
  styleUrls: ['./anggaran.component.scss']
})
export class AnggaranComponent implements OnInit, OnDestroy {
  title: string;
  formFilter: FormGroup;
  initialForm: any;
  listdata: any[] = [];
  dataselected: any;
  loading: boolean;
  unitselected: IDaftunit;
  userInfo: ITokenClaim;
  @ViewChild(AnggaranFormComponent,{static: true}) Form: AnggaranFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private auth: AuthenticationService,
    private service: IfService,
    private fb: FormBuilder,
    private notif: NotifService,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.formFilter.value;
  }
  get idunit(){
    return this.formFilter.value.idunit;
  }
  ngOnInit() {
  }
  callbackUnit(data: IDaftunit){
    this.listdata = [];
    this.dataselected = null;
    if(data){
      this.unitselected = data;
      this.formFilter.patchValue({
        idunit: data.idunit
      });
      this.get();
    } else {
      this.unitselected = null;
      this.formFilter.patchValue({
        idunit: 0
      });
    }
  }
  get(){
    if(this.formFilter.valid){
      this.dataselected = null;
      this.loading = true;
      const param = {
        Idunit: this.formFilter.value.idunit,
        Kdbm: '13'
      }
      this.service.get('Bktmem', param)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = resp;
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
        }, (error) => {
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
  clickdata(data: any){
    this.dataselected = data;
  }
  print(data: any){}
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idunit: this.unitselected.idunit
    });
    this.Form.unitselected = this.unitselected;
    this.Form.showthis = true;
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      this.notif.success('Data Berhasil Ditambahkan');
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idbm === e.data.idbm);
      this.listdata = this.listdata.filter(f => f.idbm != e.data.idbm);
      this.listdata.splice(index, 0, e.data);
      this.notif.success('Data Berhasil Diubah');
    }
    this.dataselected = null;
  }
  update(data: any){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idbm : data.idbm,
      idunit : data.idunit,
      nobm : data.nobm,
      idjbm : data.idjbm,
      referensi: data.referensi,
      uraian : data.uraian,
      tglbm : data.tglbm ? new Date(data.tglbm) : null,
      tglvalid: data.tglvalid ? new Date(data.tglvalid) : null
    });
    if(data.idjbmNavigation){
      this.Form.jenisbukti = data.idjbmNavigation.kdbm.trim() +' - '+ data.idjbmNavigation.nmbm;
    }
    this.Form.unitselected = data.idunitNavigation ? data.idunitNavigation : null;
    this.Form.showthis = true;
  }
  delete(data: any){
    this.notif.confir({
			message: `${data.nobm} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(`Bktmem/${data.idbm}`).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idbm !== data.idbm);
              this.notif.success('Data berhasil dihapus');
              this.dataselected = null;
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
  ngOnDestroy() : void {
    this.listdata = [];
    this.dataselected = null;
    this.unitselected = null;
    this.formFilter.reset(this.initialForm);
  }
}
