import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDafturus } from 'src/app/core/interface/idafturus';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IMpgrm } from 'src/app/core/interface/IMpgrm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MpgrmService } from 'src/app/core/services/mpgrm.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDafturusComponent } from 'src/app/shared/lookups/look-dafturus/look-dafturus.component';
import { ProgramFormComponent } from './program-form/program-form.component';

@Component({
  selector: 'app-program-kegiatan',
  templateUrl: './program-kegiatan.component.html',
  styleUrls: ['./program-kegiatan.component.scss']
})
export class ProgramKegiatanComponent implements OnInit, OnDestroy {
  title: string = '';
  uiUrus: IDisplayGlobal;
  urusSelected: IDafturus;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IMpgrm[] = [];
  totalRecords: number = 0;
  dataSelected: IMpgrm = null;
  @ViewChild('dt', { static: false }) dt: any;
  @ViewChild(LookDafturusComponent, { static: true }) Urus: LookDafturusComponent;
  formFilter: FormGroup;
  initialForm: any;
  @ViewChild(ProgramFormComponent, {static: true}) Form : ProgramFormComponent;
  constructor(
    private auth: AuthenticationService,
    private service: MpgrmService,
    private notif: NotifService,
    private fb: FormBuilder,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.uiUrus = { kode: '', nama: '' };
    this.formFilter = this.fb.group({
      idurus: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.formFilter.value;
  }
  ngOnInit() {
  }
  lookUrus() {
    this.Urus.title = 'Pilih Urusan';
    this.Urus.showThis = true;
  }
  callbackUrus(e: IDafturus) {
    this.urusSelected = e;
    this.uiUrus = { kode: this.urusSelected.kdurus, nama: this.urusSelected.nmurus };
    this.formFilter.patchValue({
      idurus: this.urusSelected.idurus
    });
    this.dataSelected = null;
    this.listdata = [];
    if (this.dt) this.dt.reset();
  }
  callback(e: any) {
    if (e.added) {
      if (this.dt) this.dt.reset();
    } else if(e.edited){
      this.listdata.map(m => {
        if(m.idprgrm == e.data.idprgrm){
          m.IdurusNavigation = e.data.IdurusNavigation;
          m.nuprgrm = e.data.nuprgrm;
          m.nmprgrm = e.data.nmprgrm;
          m.datecreate = e.data.datecreate;
          m.dateupdate = e.data.dateupdate;
          m.staktif = e.data.staktif;
          m.stvalid = e.data.stvalid;
          m.idprioda = e.data.idprioda;
          m.idprionas = e.data.idprionas;
          m.idprioprov = e.data.idprioprov;
          m.idurus = e.data.idurus;
          m.idxkode = e.data.idxkode;
        }
      });
    }
    this.dataSelected = null;
  }
  gets(event: LazyLoadEvent) {
    if (this.formFilter.valid) {
      this.loading = true;
      this.listdata = [];
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField ?  event.sortField : 'nuprgrm';
      this.service._sortOrder = event.sortOrder;
      this.service._idurus = this.formFilter.value.idurus;
      this.service.paging().subscribe(resp => {
        if (resp.totalrecords > 0) {
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
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
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idurus : this.formFilter.value.idurus
    });
    this.Form.showThis = true;
  }
  edit(e: IMpgrm){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idprgrm : e.idprgrm,
      idurus : e.idurus,
      nmprgrm : e.nmprgrm,
      nuprgrm : e.nuprgrm,
      staktif : e.staktif,
      stvalid : e.stvalid,
    });
    this.Form.showThis = true;
  }
  delete(e: IMpgrm){
    this.notif.confir({
    	message: `${e.nmprgrm} Akan Dihapus ?`,
    	accept: () => {
    		this.service.delete(e.idprgrm).subscribe(
    			(resp) => {
    				if (resp.ok) {
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
  onClick(e: IMpgrm){
    this.dataSelected = e;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.uiUrus = { kode: '', nama: '' };
    this.urusSelected = null;
    this.dataSelected = null;
    this.totalRecords = 0;
    if (this.formFilter) this.formFilter.reset(this.initialForm);
  }
}
