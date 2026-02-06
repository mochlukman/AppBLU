import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBkbkas } from 'src/app/core/interface/ibkbkas';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { indoKalender } from 'src/app/core/local';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { JurnalKonsolidatorService } from 'src/app/core/services/jurnal-konsolidator.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormJurnalKonsolidatorComponent } from 'src/app/shared/Component/form-jurnal-konsolidator/form-jurnal-konsolidator.component';
import { JurnalKonsolidatorDetailComponent } from 'src/app/shared/Component/jurnal-konsolidator-detail/jurnal-konsolidator-detail.component';
import { LookRekeningBudComponent } from 'src/app/shared/lookups/look-rekening-bud/look-rekening-bud.component';

@Component({
  selector: 'app-pengeluaran',
  templateUrl: './pengeluaran.component.html',
  styleUrls: ['./pengeluaran.component.scss']
})
export class PengeluaranComponent implements OnInit, OnDestroy {
  uiBud: IDisplayGlobal;
  budSelected: IBkbkas;
  title: string;
  formFilter: FormGroup;
  initialForm: any;
  indoKalender: any;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  dataselected: any;
  @ViewChild(LookRekeningBudComponent, {static: true}) Bud : LookRekeningBudComponent;
  @ViewChild(FormJurnalKonsolidatorComponent, {static: true}) Form: FormJurnalKonsolidatorComponent;
  @ViewChild(JurnalKonsolidatorDetailComponent, {static: true}) Details: JurnalKonsolidatorDetailComponent;
  constructor(
    private service: JurnalKonsolidatorService,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private notif: NotifService,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.formFilter = this.fb.group({
      nobbantu: ['', Validators.required],
      tgl1: [new Date(new Date().getFullYear() +'-01-01'), Validators.required],
      tgl2: [new Date(new Date().getFullYear() +'-12-31'), Validators.required]
    });
    this.initialForm = this.formFilter.value;
    this.indoKalender = indoKalender;
    this.userInfo = this.auth.getTokenInfo();
    this.uiBud = {kode: '', nama: ''};
    this.budSelected = null;
  }

  ngOnInit() {
  }
  lookBud(){
    this.Bud.title = 'Pilih Rekening BUD';
    this.Bud.gets();
    this.Bud.showThis = true;
  }
  callBackBud(e: IBkbkas){
    this.budSelected = e;
    this.uiBud = {
      kode: this.budSelected.nobbantu,
      nama: this.budSelected.nmbkas
    };
    this.formFilter.patchValue({
      nobbantu: this.budSelected.nobbantu
    });
    this.listdata = [];
    this.dataselected = null;
  }
  gets(){
    if(this.formFilter.valid){
      this.formFilter.patchValue({
        tgl1: this.formFilter.value.tgl1 != null ? new Date(this.formFilter.value.tgl1).toLocaleDateString('en-US') : null,
        tgl2: this.formFilter.value.tgl2 != null ? new Date(this.formFilter.value.tgl2).toLocaleDateString('en-US') : null
      });
      this.loading = true;
      this.listdata = [];
      this.service.konsPengenluaran(
        this.formFilter.value.nobbantu,
        this.formFilter.value.tgl1,
        this.formFilter.value.tgl2,
      ).subscribe(resp => {
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
  callback(e: any){
    if(e.edited){
      this.gets();
    }
  }
  update(e: any){
    this.Form.forms.patchValue({
      idbku : e.IDBKUK,
      nobkukas : e.NOBUKAS,
      tglkas : e.TGLSP2D ? new Date(e.TGLSP2D) : null,
      nobukti: e.NOSP2D,
      nmbukti: e.NBBUKTI,
      idref : e.IDSP2D,
      uraian : e.URAIAN,
      tglvalid: e.TGLVALID ? new Date(e.TGLVALID) : null,
      jenis : 'pengeluaran',
      valid: e.VALID
    });
    this.Form.uiRef = {kode: e.NOSP2D, nama: new Date(e.TGLSP2D).toLocaleDateString('en-US')};
    console.log(e);
    this.Form.title = 'Edit Jurnal Konsolidator Pengeluaran';
    this.Form.titleRef = 'SP2D';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: any){
    let postBody = {
      idbku : e.IDBKUK,
      nobkukas : e.NOBUKAS,
      tglkas : e.TGLSP2D ? new Date(e.TGLSP2D) : null,
      nobukti: e.NOSP2D,
      nmbukti: e.NBBUKTI,
      idref : e.IDSP2D,
      uraian : e.URAIAN,
      tglvalid: null,
      jenis : 'pengeluaran',
      valid: false
    }
    this.notif.confir({
			message: `Hapus Validasi ?`,
			accept: () => {
				this.service.put(postBody).subscribe(
					(resp) => {
						if (resp.ok) {
              this.notif.success('Validasi berhasil dihapus');
              this.gets();
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
  detail(e: any){
    let paramBody = {
      jenis: 'pengeluaran',
      nobukti: e.NOSP2D
    };
    this.Details.params = paramBody;
    this.Details.title = 'Ayat - Ayat Jurnal Konsolidator Pengeluaran';
    this.Details.showThis = true;
  }
  ngOnDestroy(): void {
    this.uiBud = {kode: '', nama: ''};
    this.budSelected = null;
  }
}
