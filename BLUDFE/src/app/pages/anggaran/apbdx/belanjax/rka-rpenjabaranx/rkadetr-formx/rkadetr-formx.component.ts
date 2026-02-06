import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { RkadetrService } from 'src/app/core/services/rkadetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookSshComponent } from 'src/app/shared/lookups/look-ssh/look-ssh.component';
import { IJdana } from 'src/app/core/interface/ijdana';
import { LookJdanaComponent } from 'src/app/shared/lookups/look-jdana/look-jdana.component';

@Component({
  selector: 'app-rkadetr-formx',
  templateUrl: './rkadetr-formx.component.html',
  styleUrls: ['./rkadetr-formx.component.scss'],
  providers: [InputRupiahPipe]
})
export class RkadetrFormxComponent implements OnInit {
  idrek: number = 0;
  uiSsh: IDisplayGlobal;
  uiJdana: IDisplayGlobal;
  sshSelected: any;
  jdanaSelected: IJdana;
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  isHeader: boolean;
  @Output() callback = new EventEmitter();
  @ViewChild(LookSshComponent, {static: true}) sshForm : LookSshComponent;
  @ViewChild(LookJdanaComponent, {static: true}) Jdana : LookJdanaComponent;
  constructor(
    private service: RkadetrService,
    private fb: FormBuilder,
    private notif: NotifService
  ) {
    this.uiSsh = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idrkadetr: 0,
      idrkar: [0, [Validators.required, Validators.min(1)]],
      kdjabar: ['', Validators.required],
      idstdharga: 0,
      uraian: '',
      satuan: '',
      tarif: 0,
      ekspresi: '',
      type: '',
      idrkadetrduk: 0,
      idssh: 0,
      idjdana: 0
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit() {
    this.uiJdana = {kode: '', nama: ''};
  }
  lookSsh(){
    this.sshForm.title = 'Pilih Standar Harga';
    this.sshForm.Idrek = this.idrek;
    this.sshForm.showThis = true;
  }
  callbackSsh(e: any){
    this.forms.patchValue({
      idssh: e.idssh
    });
    this.uiSsh = {kode: e.kdssh.trim(), nama: e.uraian.trim()};
    this.sshSelected = e;
  }
  lookJdana(){
    this.Jdana.title = 'Pilih Jenis Dana';
    this.Jdana.gets();
    this.Jdana.showThis = true;
  }
  callbackJdana(e: IJdana){
    this.jdanaSelected = e;
    this.uiJdana = {kode: this.jdanaSelected.kddana.trim(), nama: this.jdanaSelected.nmdana.trim()};
    this.forms.patchValue({
      idjdana: this.jdanaSelected.idjdana
    });
  }
  typeChange(e: string) {
    if (e == 'H') {
      this.isHeader = true;
      this.forms.patchValue({
        satuan: '',
        tarif: 0,
        ekspresi: '',
      });
    } else {
      this.isHeader = false;
    }
  }
  simpan() {
    if (this.forms.valid) {
      this.loading_post = true;
      this.forms.get('type').enable();
      if (this.mode === 'add') {
        if(this.forms.value.idrkadetrduk == null){
          this.forms.patchValue({
            idrkadetrduk: 0
          });
        }
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
          if (Array.isArray(error.error.error)) {
            this.msg = [];
            for (var i = 0; i < error.error.error.length; i++) {
              this.msg.push({ severity: 'error', summary: 'error', detail: error.error.error[i] });
            }
          } else {
            this.msg = [];
            this.msg.push({ severity: 'error', summary: 'error', detail: error.error });
          }
          this.loading_post = false;
        });
      } else if (this.mode === 'edit') {
        if(this.forms.value.idrkadetrduk == null){
          this.forms.patchValue({
            idrkadetrduk: 0
          });
        }
        this.service.put(this.forms.value).subscribe((resp) => {
          if (resp.ok) {
            this.callback.emit({
              edited: true,
              data: resp.body
            });
            this.onHide();
            this.notif.success('Input Data Berhasil');
          }
          this.loading_post = false;
        }, (error) => {
          if (Array.isArray(error.error.error)) {
            this.msg = [];
            for (var i = 0; i < error.error.error.length; i++) {
              this.msg.push({ severity: 'error', summary: 'error', detail: error.error.error[i] });
            }
          } else {
            this.msg = [];
            this.msg.push({ severity: 'error', summary: 'error', detail: error.error });
          }
          this.loading_post = false;
        });
      }
    }
  }
  onShow() {
    if(this.forms.value.type == 'H'){
      this.isHeader = true;
    }
    if(this.mode == 'edit'){
      this.forms.get('type').disable();
    }
  }
  onHide() {
    this.forms.reset(this.initialForm);
    this.msg = [];
    this.loading_post = false;
    this.isHeader = false;
    this.forms.get('type').enable();
    this.uiSsh = {kode: '', nama: ''};
    this.uiJdana = {kode: '', nama: ''};
    this.sshSelected = null;
    this.jdanaSelected = null;
    this.showThis = false;
  }
}
