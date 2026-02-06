import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IPegawai } from 'src/app/core/interface/ipegawai';
import { ITahap } from 'src/app/core/interface/itahap';
import { IWEbGroup } from 'src/app/core/interface/iweb-group';
import { TahapService } from 'src/app/core/services/tahap.service';
import { WebGroupService } from 'src/app/core/services/web-group.service';
import { WebUserService } from 'src/app/core/services/web-user.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { LookPegawaiComponent } from 'src/app/shared/lookups/look-pegawai/look-pegawai.component';

@Component({
  selector: 'app-form-pengguna',
  templateUrl: './form-pengguna.component.html',
  styleUrls: ['./form-pengguna.component.scss']
})
export class FormPenggunaComponent implements OnInit {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiPeg: IDisplayGlobal;
  pegawaiSelected: IPegawai;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callBack = new EventEmitter();
  listGroup: SelectItem[] = [];
  groupSelected: IWEbGroup;
  listTahap: SelectItem[] = [];
  tahapSelected: ITahap;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookPegawaiComponent, {static: true}) Pegawai : LookPegawaiComponent;
  @ViewChild('r1', {static:true}) r1: any;
  @ViewChild('r2', {static:true}) r2: any;
  @ViewChild('r3', {static:true}) r3: any;
  @ViewChild('r4', {static:true}) r4: any;
  @ViewChild('ck1', {static:true}) ck1: any;
  @ViewChild('ck2', {static:true}) ck2: any;
  @ViewChild('ck3', {static:true}) ck3: any;
  constructor(
    private service: WebUserService,
    private fb: FormBuilder,
    private notif: NotifService,
    private groupService: WebGroupService,
    private tahapService: TahapService,
    private cdr: ChangeDetectorRef
  ) {
    this.forms = this.fb.group({
      userid : ['', Validators.required],
      idunit : 0,
      kdtahap : ['', Validators.required],
      pwd : '',
      idpeg : 0,
      groupid : 0,
      nama : '',
      email : '',
      blokid : 0,
      transecure : false,
      stmaker : false,
      stchecker : false,
      staproval : false,
      stlegitimator : false,
      stinsert : false,
      stupdate : false,
      stdelete : false,
      ket : ''
    });
    this.uiPeg = {kode: '', nama: ''};
    this.uiUnit = {kode: '', nama: ''};
  }
  ngOnInit(){
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callbackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode : e.kdunit, nama: e.nmunit};
    this.forms.patchValue({
      idunit : e.idunit
    });
  }
  lookPegawai(){
    if(this.unitSelected){
      this.Pegawai.title = 'Pilih Pegawai';
      this.Pegawai.gets(this.unitSelected.idunit);
      this.Pegawai.showThis = true;
    } else {
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih SKPD'});
    }
    
  }
  callbackPegawai(e: IPegawai){
    this.pegawaiSelected = e;
    this.uiPeg = {kode: e.nip != '' ? e.nip.trim() : '', nama: e.nama};
    this.forms.patchValue({
      idpeg: e.idpeg
    });
  }
  getGroup(){
    this.listGroup = [];
    this.groupService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          resp.forEach(x => {
            this.listGroup.push({label: x.nmgroup, value:x.groupid});
          });
          if(this.mode === 'edit'){
            this.groupSelected = this.listGroup.find(w => w.value == this.forms.value.groupid).value;
          }
        }
      },(error) => {
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
      });
  }
  changeGroup(e: any){
    this.forms.patchValue({
      groupid: e.value
    });
  }
  getTahap(){
    this.listTahap = [];
    this.tahapService.gets()
      .subscribe(resp => {
        if(resp.length > 0){
          resp.forEach(x => {
            this.listTahap.push({label: x.uraian , value:x.kdtahap.trim()});
          });
          this.tahapSelected = this.listTahap.find(w => w.value == this.forms.value.kdtahap.trim()).value;
        }
      },(error) => {
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
      });
  }
  changeTahap(e: any){
    this.forms.patchValue({
      kdtahap: e.value,
    });
    
  }
  clickOtor(e: any){
    if(e.inputId == 'stmaker'){
      this.ck1.readonly = false;
      this.ck2.readonly = false;
      this.ck3.readonly = false;
      this.forms.patchValue({
        stchecker: false,
        staproval: false,
        stlegitimator: false
      });
    } else {
      this.ck1.readonly = true;
      this.ck1.checked = false;
      this.ck2.readonly = false;
      this.ck3.readonly = true;
      this.ck3.checked = false;
      this.forms.patchValue({
        stinsert: false,
        stdelete: false
      });
    }
    if(e.inputId == 'stchecker'){
      this.forms.patchValue({
        stmaker: false,
        staproval: false,
        stlegitimator: false,
      });
    } else if(e.inputId == 'staproval') {
      this.forms.patchValue({
        stmaker: false,
        stchecker: false,
        stlegitimator: false,
      });
    } else if(e.inputId == 'stlegitimator') {
      this.forms.patchValue({
        stmaker: false,
        stchecker: false,
        staproval: false,
      });
    }
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      if(this.mode === 'add'){
        this.service.post(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callBack.emit({
              added: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Input Data Berhasil');
          }
          this.loading_post = false;
        }, (error) => {
          if(Array.isArray(error.error.error)){
            this.msg = [];
            for(var i = 0; i < error.error.error.length; i++){
              this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
            }
          } else {
            this.msg = [];
            this.msg.push({severity: 'error', summary: 'error', detail: error.error});
          }
          this.loading_post = false;
        });
      } else if(this.mode === 'edit'){
        this.service.put(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callBack.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Input Data Berhasil');
          }
          this.loading_post = false;
        }, (error) => {
          if(Array.isArray(error.error.error)){
            this.msg = [];
            for(var i = 0; i < error.error.error.length; i++){
              this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
            }
          } else {
            this.msg = [];
            this.msg.push({severity: 'error', summary: 'error', detail: error.error});
          }
          this.loading_post = false;
        });
      }
    }
  }
  onShow(){
    this.getTahap();
    this.getGroup();
    this.r1.checked = this.forms.value.stmaker;
    this.r2.checked = this.forms.value.stchecker;
    this.r3.checked = this.forms.value.staproval;
    this.r4.checked = this.forms.value.stlegitimator;
    if(this.forms.value.stmaker == true){
      this.ck1.readonly = false;
      this.ck2.readonly = false;
      this.ck3.readonly = false;
    } else if(this.forms.value.stchecker || this.forms.value.staproval || this.forms.value.stlegitimator) {
      this.ck1.readonly = true;
      this.ck2.readonly = false;
      this.ck3.readonly = true;
    } else {
      this.ck1.readonly = true;
      this.ck2.readonly = true;
      this.ck3.readonly = true;
    }
    this.cdr.detectChanges();
  }
  onHide(){
    this.uiPeg = {kode: '', nama: ''};
    this.uiUnit = {kode: '', nama: ''};
    this.forms.reset();
    this.forms.patchValue({
      userid : '',
      idunit : 0,
      kdtahap : '',
      pwd : '',
      idpeg : 0,
      groupid : 0,
      nama : '',
      email : '',
      blokid : 0,
      transecure : false,
      stmaker : false,
      stchecker : false,
      staproval : false,
      stlegitimator : false,
      stinsert : false,
      stupdate : false,
      stdelete : false,
      ket : ''
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.pegawaiSelected = null;
    this.unitSelected = null;
    this.listGroup = [];
    this.listTahap = [];
    this.groupSelected = null;
    this.tahapSelected = null;
    this.ck1.readonly = true;
    this.ck1.checked = false;
    this.ck2.readonly = true;
    this.ck2.checked = false;
    this.ck3.readonly = true;
    this.ck3.checked = false;
    this.r1.checked = false;
    this.r2.checked = false;
    this.r3.checked = false;
    this.r4.checked = false;
  }
}