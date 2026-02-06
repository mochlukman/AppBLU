import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITahap } from 'src/app/core/interface/itahap';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { RkaMainService } from 'src/app/core/services/rka-main.service';
import { RkadService } from 'src/app/core/services/rkad.service';
import { TahapService } from 'src/app/core/services/tahap.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';

@Component({
  selector: 'app-transfer-apbd',
  templateUrl: './transfer-apbd.component.html',
  styleUrls: ['./transfer-apbd.component.scss']
})
export class TransferApbdComponent implements OnInit, OnDestroy {
  title: string = '';
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading_post: boolean;
  loading: boolean;
  formFilter: FormGroup;
  initialForm: any;
  listTahapSumber: SelectItem[];
  listTahapTujuan: SelectItem[];
  msg: Message[];
  @ViewChild(LookDaftunitComponent, { static: true }) Daftunit: LookDaftunitComponent;
  constructor(
    private auth: AuthenticationService,
    private global: GlobalService,
    private fb: FormBuilder,
    private tahapService: TahapService,
    private notif: NotifService,
    private service: RkaMainService,
    private unitService: DaftunitService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = { kode: '', nama: '' };
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdtahapawal: ['', Validators.required],
      kdtahapakhir: ['', Validators.required],
      spname: ['[dbo].[WSP_TRANSFERRKA]', Validators.required],
      ismode: 0
    });
    if(this.userInfo.Idunit != 0){
      this.unitService.get(this.userInfo.Idunit).subscribe(resp => {
        this.callBackDaftunit(resp);
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
    this.initialForm = this.formFilter.value;
  }
  ngOnInit() {
    this.getTahap('sumber', '321');
    this.getTahap('tujuan', '341');
  }
  lookDaftunit() {
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  getTahap(type: string, kdtahap: string){
    if(type == 'sumber'){
      this.listTahapSumber = [
        { label: 'Pilih Tahap', value: null }
      ];
    } else if(type == 'tujuan'){
      this.listTahapTujuan = [
        { label: 'Pilih Tahap', value: null }
      ];
    }


    this.tahapService.getsBykode(kdtahap)
      .subscribe(resp => {
        let temp: ITahap[] = [];
        if (resp.length > 0) {
          temp = resp;
          if(type == 'sumber'){
            temp.forEach(e => {
              this.listTahapSumber.push({ label: `${e.uraian.trim()}`, value: e.kdtahap.trim() })
            });
          } else if(type == 'tujuan'){
            temp.forEach(e => {
              this.listTahapTujuan.push({ label: `${e.uraian.trim()}`, value: e.kdtahap.trim() })
            });
          }

        }
      });
  }
  callBackDaftunit(e: IDaftunit) {
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
  }
  changeTahap(e: any, type: string){
    if(type == 'sumber'){
      if(e.value){
        this.formFilter.patchValue({
          kdtahapawal: e.value
        });
      } else {
        this.formFilter.patchValue({
          kdtahapawal: ''
        });
        this.notif.warning('Pilih Tahap Sumber');
      }
    } else if(type == 'tujuan'){
      if(e.value){
        this.formFilter.patchValue({
          kdtahapakhir: e.value
        });
      } else {
        this.formFilter.patchValue({
          kdtahapakhir: ''
        });
        this.notif.warning('Pilih Tahap Tujuan');
      }
    }
  }
  onchangeMode(e : any){
    if(e.checked){
      this.formFilter.patchValue({
        ismode: 1
      });
    } else {
      this.formFilter.patchValue({
        ismode: 0
      });
    }
  }
  transfer(){
    if(this.formFilter.valid){
      this.loading_post = true;
      this.service.transfer(this.formFilter.value).subscribe(resp => {
        if(resp.body['status']){
          this.msg = [];
          this.msg.push({severity: 'success', summary: 'Sukses', detail: resp.body['message']});
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'Error', detail: resp.body['message']});
        }
        this.loading_post = false;

      },(error) => {
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error.message});
        }
        this.loading_post = false;
      });
    }
  }
  ngOnDestroy(): void {
    this.formFilter.reset(this.initialForm);
    this.uiUnit = { kode: '', nama: '' };
    this.unitSelected = null;
    this.msg = [];
  }
}
