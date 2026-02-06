import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { IPaguskpd } from 'src/app/core/interface/ipaguskpd';
import { ITahap } from 'src/app/core/interface/itahap';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PaguskpdService } from 'src/app/core/services/paguskpd.service';
import { TahapService } from 'src/app/core/services/tahap.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormSkupComponent } from './form-skup/form-skup.component';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-skup',
  templateUrl: './skup.component.html',
  styleUrls: ['./skup.component.scss']
})
export class SkupComponent implements OnInit, OnDestroy {
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IPaguskpd[] = [];
  dataSelected: IPaguskpd = null;
  tahap: SelectItem[] = [];
  tahapSelected: string;
  listTahap: ITahap[] = [];
  totalRecords: number = 0;
  @ViewChild('dt',{static:false}) dt: any;
  formFilter: FormGroup;
  initialForm: any;
  @ViewChild(FormSkupComponent, {static: true}) Form: FormSkupComponent;
  title: string = '';
  constructor(
    private auth: AuthenticationService,
    private service: PaguskpdService,
    private notif: NotifService,
    private tahapService: TahapService,
    private fb: FormBuilder,
    private global: GlobalService
  ) {
    this.global._title.subscribe((e) => {
      this.title = e;
    })
    this.formFilter = this.fb.group({
      kdtahap: ['', Validators.required]
    });
    this.initialForm = this.formFilter.value;
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
    this.getTahap();
  }
  callback(e: any){
    if(e.added){
      if(this.dt) this.dt.reset();
    } else if(e.edited && typeof e.data ==  'object'){
      let data: IPaguskpd = e.data;
      this.listdata.map(m => {
        if(m.idpaguskpd == data.idpaguskpd){
          m.nilai = data.nilai;
          m.nilaiup = data.nilaiup;
        }
      });
    }
  }
  getTahap(){
    this.tahap = [];
    this.tahapService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          this.listTahap = [...resp];
          resp.forEach(x => {
            this.tahap.push({label: x.uraian , value: x.kdtahap.trim()});
          });
        }
      },(error) => {
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
  }
  changeTahap(e: any){
    this.formFilter.patchValue({
      kdtahap: e.value
    });
    if(this.dt) this.dt.reset();
  }
  gets(event: LazyLoadEvent){
    if(this.formFilter.valid){
      this.loading = true;
      this.listdata = [];
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._kdtahap = this.formFilter.value.kdtahap;
      this.service.paging().subscribe(resp => {
        if(resp.totalrecords > 0){
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
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
      this.notif.warning('Pilih Unit Organisasi');
    }
  }
  add(){
    this.Form.forms.patchValue({
      kdtahap : this.formFilter.value.kdtahap
    });
    this.Form.title = 'Tambah';
    this.Form.mode = 'add';
    this.Form.showThis = true;
  }
  update(e: IPaguskpd){
    this.Form.forms.patchValue({
      idpaguskpd : e.idpaguskpd,
      idunit : e.idunit,
      kdtahap : e.kdtahap,
      nilaiup : e.nilaiup,
      nilai : e.nilai
    });
    if(e.idunitNavigation){
      this.Form.uiUnit = {kode: e.idunitNavigation.kdunit, nama: e.idunitNavigation.kdunit};
    }
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  dataKlick(e: IPaguskpd){
		this.dataSelected = e;
	}
  delete(e: IPaguskpd){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idpaguskpd).subscribe(
					(resp) => {
						if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              if(this.dt)this.dt.reset();
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
    this.formFilter.reset(this.initialForm);
    this.listdata = [];
		this.dataSelected = null;
    this.tahap = [];
    this.tahapSelected = null;
    this.listTahap = [];
    this.totalRecords = 0;
  }
}
