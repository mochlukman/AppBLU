import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { IfService } from 'src/app/core/services/if.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { JurnalMemorialFormComponent } from './jurnal-memorial-form/jurnal-memorial-form.component';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {LookDaftunitComponent} from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';

@Component({
  selector: 'app-jurnal-memorial',
  templateUrl: './jurnal-memorial.component.html',
  styleUrls: ['./jurnal-memorial.component.scss']
})
export class JurnalMemorialComponent implements OnInit, OnDestroy {
  title: string;
  formFilter: FormGroup;
  initialForm: any;
  listdata: any[] = [];
  dataselected: any;
  loading: boolean;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  @ViewChild(JurnalMemorialFormComponent,{static: true}) Form: JurnalMemorialFormComponent;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private auth: AuthenticationService,
    private service: IfService,
    private fb: FormBuilder,
    private notif: NotifService,
    private unitService: DaftunitService,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]]
    });
    this.uiUnit = {kode: '', nama: ''};
    this.initialForm = this.formFilter.value;
    if(this.userInfo.Idunit != 0){
      this.unitService.get(this.userInfo.Idunit).subscribe(resp => {
        this.callbackUnit(resp);
      },error => {
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
  get idunit(){
    return this.formFilter.value.idunit;
  }
  ngOnInit() {
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callbackUnit(data: IDaftunit){
    this.unitSelected = data;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
    this.listdata = [];
    this.get();
  }
  get(){
    if(this.formFilter.valid){
      this.dataselected = null;
      this.loading = true;
      const param = {
        Idunit: this.formFilter.value.idunit,
        Kdbm: '01,02,03,04,05,06,90,11,031,111'
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
  callback(e: any){
    if(e.validasi){
      let index = this.listdata.findIndex(f => f.idbm === e.data.idbm);
      this.listdata = this.listdata.filter(f => f.idbm != e.data.idbm);
      this.listdata.splice(index, 0, e.data);
      this.notif.success('Data Berhasil Divalidasi');
    }
    this.dataselected = null;
  }
  update(data: any){
    this.Form.title = 'Validasi Jurnal Memorial';
    this.Form.mode = 'validasi';
    this.Form.forms.patchValue({
      idbm : data.idbm,
      idunit : data.idunit,
      nobm : data.nobm,
      idjbm : data.idjbm,
      referensi: data.referensi,
      uraian : data.uraian,
      tglbm : data.tglbm ? new Date(data.tglbm) : null,
      tglvalid: data.tglvalid ? new Date(data.tglvalid) : null,
      valid: data.valid
    });
    if(data.idjbmNavigation){
      this.Form.jenisbukti = data.idjbmNavigation.kdbm.trim() +' - '+ data.idjbmNavigation.nmbm;
    }
    this.Form.unitselected = data.idunitNavigation ? data.idunitNavigation : null;
    this.Form.showthis = true;
  }
  ngOnDestroy() : void {
    this.listdata = [];
    this.dataselected = null;
    this.unitSelected = null;
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter.reset(this.initialForm);
  }
}
