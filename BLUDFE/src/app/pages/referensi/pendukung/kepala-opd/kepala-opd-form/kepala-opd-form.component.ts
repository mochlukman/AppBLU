import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message, SelectItem} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AtasbendService} from 'src/app/core/services/atasbend.service';
import {LookDaftunitComponent} from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {LookPegawaiComponent} from 'src/app/shared/lookups/look-pegawai/look-pegawai.component';
import {IPegawai} from 'src/app/core/interface/ipegawai';

@Component({
  selector: 'app-kepala-opd-form',
  templateUrl: './kepala-opd-form.component.html',
  styleUrls: ['./kepala-opd-form.component.scss']
})
export class KepalaOpdFormComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  initialForm: any;
  unitSelected: any = null;
  uiUnit: IDisplayGlobal;
  pegawaiSelected: any = null;
  uiPegawai: IDisplayGlobal;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookPegawaiComponent,{static: true}) Pegawai: LookPegawaiComponent;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: AtasbendService
  ) {
    this.uiUnit = {kode: '', nama: ''};
    this.uiPegawai = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idpa: [0, Validators.required],
      idunit: [0, [Validators.required, Validators.min(1)]],
      idpeg: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callbackUnit(e: any){
    this.unitSelected = null;
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.forms.patchValue({
      idunit: this.unitSelected.idunit,
      idpeg: 0
    });
    this.pegawaiSelected = null;
    this.uiPegawai = {kode: '', nama: ''};
  }
  lookPegawai(){
    this.Pegawai.title = 'Pilih Pegawai';
    this.Pegawai.showThis = true;
    this.Pegawai.gets(this.forms.value.idunit);
  }
  callbackPegawai(e: any){
    this.pegawaiSelected = e;
    this.uiPegawai = {kode: this.pegawaiSelected.nip, nama: this.pegawaiSelected.nama};
    this.forms.patchValue({
      idpeg: this.pegawaiSelected.idpeg
    });
  }
  simpan(){
    if(this.forms.valid){
      this.loading_post = true;
      if(this.mode == 'add'){
        this.service.post(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
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
            this.callback.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Ubah Data Berhasil');
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
    if(this.unitSelected){
      this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
      this.forms.patchValue({
        idunit: this.unitSelected.idunit
      });
    }
    if(this.pegawaiSelected){
      this.uiPegawai = {kode: this.pegawaiSelected.nip, nama: this.pegawaiSelected.nama};
      this.forms.patchValue({
        idpeg: this.pegawaiSelected.idpeg
      });
    }
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.unitSelected = null;
    this.pegawaiSelected = null;
    this.uiUnit = {kode: '', nama: ''};
    this.uiPegawai = {kode: '', nama: ''};
  }
}
