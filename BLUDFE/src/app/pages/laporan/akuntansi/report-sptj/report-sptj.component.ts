import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {MenuItem} from 'primeng/api';
import {IReportParameter} from 'src/app/core/interface/ireport-parameter';
import {LookDaftunitComponent} from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import {ReportModalComponent} from 'src/app/shared/modals/report-modal/report-modal.component';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {ReportService} from 'src/app/core/services/report.service';
import {DaftunitService} from 'src/app/core/services/daftunit.service';
import { indoKalender } from 'src/app/core/local';
import {GlobalService} from 'src/app/core/services/global.service';
import {LookSkpComponent} from 'src/app/shared/lookups/look-skp/look-skp.component';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-report-sptj',
  templateUrl: './report-sptj.component.html',
  styleUrls: ['./report-sptj.component.scss'],
  providers: [DatePipe]
})
export class ReportSptjComponent implements OnInit, OnDestroy {
  title: string = '';
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  uiSp2t: IDisplayGlobal;
  indoKalender: any;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
  parameterReport: IReportParameter;
  typeDocument: number;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  @ViewChild(LookSkpComponent, {static: true}) Skp : LookSkpComponent;
  forms: FormGroup;
  initialForm: any;
  constructor(
    private authService: AuthenticationService,
    private notif: NotifService,
    private reportService: ReportService,
    private unitService: DaftunitService,
    private global: GlobalService,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.authService.getTokenInfo();
    this.uiUnit = {kode: '', nama: '' };
    this.uiSp2t = {kode: '', nama: '' };
    this.forms = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      idskp: [0, [Validators.required, Validators.min(1)]],
      idbulan: 0,
      tgl: null
    });
    this.initialForm = this.forms.value;
    this.indoKalender = indoKalender;
    this.itemPrints = [
      {
        label: 'PDF',
        icon: 'fa fa-file-pdf-o',
        command: () => {
          this.cetak(1);
        }
      },
      {
        label: 'WORD',
        icon: 'fa fa-file-word-o',
        command: () => {
          this.cetak(2);
        }
      },
      {
        label: 'EXCEL',
        icon: 'fa fa-file-excel-o',
        command: () => {
          this.cetak(3);
        }
      }
    ];
    if (this.userInfo.Idunit.toString() !== "0") {
      this.unitService.get(this.userInfo.Idunit).subscribe(resp => {
        this.callBackDaftunit(resp);
      }, error => {
        this.loading = false;
        if (Array.isArray(error.error.error)) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < error.error.error.length; i++) {
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
  }

  ngOnInit() {

  }

  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    if(e){
      this.uiUnit = { kode: e.kdunit, nama: e.nmunit };
    } else {
      this.uiUnit = {kode: '', nama: '' };
    }
    this.forms.patchValue({
      idunit: e ? e.idunit : 0
    });
  }
  lookSp2t(){
    if(this.forms.controls['idunit'].valid){
      this.Skp.title = 'Pilih SP2T';
      this.Skp.gets(this.forms.value.idunit, null, '77,78', null, true);
      this.Skp.showThis = true;
    } else {
      this.notif.warning('SKPD harus dipilih');
    }
  }
  callbackSp2t(e: any){
    if(e){
      this.uiSp2t = {kode: e.noskp, nama: this.datePipe.transform(e.tglskp, 'dd/MM/yyyy')};
    } else {
      this.uiSp2t = {kode: '', nama: '' };
    }
    this.forms.patchValue({
      idskp: e ? e.idskp : 0
    });
  }
  callbackBulan(e: any){
    this.forms.patchValue({
      idbulan: e ? e.idbulan : 0
    });
  }
  callBackTanggal(e: any){
    if(e.cetak){
      this.loading_post = true;
      this.parameterReport = {
        Type: this.typeDocument,
        FileName: 'sp2t.rpt',
        Params: {
          '@idunit': this.forms.value.idunit,
          '@nosp2t': this.forms.value.noskp,
          //'@idbulan': this.forms.value.idbulan,
          //'@tgl': (this.forms.value.tgl !== null || this.forms.value.tgl != '') ? new Date(this.forms.value.tgl).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
          //'@tanggal': e.TGL,
          //'@hal':e.halaman
        }
      };
      this.reportService.execPrint(this.parameterReport).subscribe((resp) => {
        this.loading_post = false;
        this.reportService.extractData(resp, this.parameterReport.Type, this.parameterReport.FileName);
      });
    }
  }
  cetak(type: number) {
    this.typeDocument = type;
    this.showTanggal.useTgl = true;
    this.showTanggal.useHal = true;
    this.showTanggal.showThis = true;
  }
  ngOnDestroy() {
    this.uiUnit = { kode: '', nama: '' };
    this.uiSp2t = { kode: '', nama: '' };
    this.forms.reset(this.initialForm);
  }
}
