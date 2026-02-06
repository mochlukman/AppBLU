import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IJsatuan } from 'src/app/core/interface/ijsatuan';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpadetdService } from 'src/app/core/services/dpadetd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookJsatuanComponent } from 'src/app/shared/lookups/look-jsatuan/look-jsatuan.component';

@Component({
  selector: 'app-form-skd-penjabaran',
  templateUrl: './form-skd-penjabaran.component.html',
  styleUrls: ['./form-skd-penjabaran.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormSkdPenjabaranComponent implements OnInit {
  loading_post: boolean;
  title: string;
  mode: string;
  showThis: boolean;
	showPreview: boolean;
	keyword: string;
	userInfo: ITokenClaim;
	uiSatuan: IDisplayGlobal;
	forms: FormGroup;
  msgs: Message[];
  kode_induk: string;
	@ViewChild(LookJsatuanComponent,{static: true}) lookSatuan: LookJsatuanComponent;
  @Output() callBack = new EventEmitter();
  isHeader: boolean;
	constructor(
		private auth: AuthenticationService,
		private fb: FormBuilder,
		private service: DpadetdService,
		private notif: NotifService
	) {
		this.userInfo = this.auth.getTokenInfo();
		this.uiSatuan = {kode: '', nama: ''};
		this.forms = this.fb.group({
      iddpad: [0, Validators.required],
			iddpadetd: [0],
			iddpadetdduk: [0],
      kdjabar: [ '', Validators.required ],
			uraian: [ '', Validators.required ],
      idsatuan: [''],
      satuan: [''],
			tarif: [0],
			type: ['', Validators.required],
			ekspresi: ['']
		});
	}

	ngOnInit() {}
	getSatuan() {
		this.lookSatuan.gets();
		this.lookSatuan.showThis = true;
	}
	callBackSatuan(e: IJsatuan){
		this.forms.patchValue({
			satuan: e.uraisatuan,
			idsatuan: e.idsatuan
		});
		this.uiSatuan = {kode: e.kdsatuan, nama: e.uraisatuan};
  }
  onChangeType(e: any){
    if(e === 'H'){
      this.isHeader = true;
      this.forms.patchValue({
        idsatuan: '',
        satuan: '',
        tarif: 0,
        ekspresi: ''
      });
      this.uiSatuan  = {kode: '', nama: ''};
    }
    if(e === 'D') this.isHeader = false;
  }
	simpan() {
		if (this.forms.valid) {
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
          this.msgs = [];
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.msgs.push({ severity: 'error', summary: 'Error', detail: error.error.error[i] });
            }
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error', detail: error.error });
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
            this.notif.success('Update Data Berhasil');
          }
          this.loading_post = false;
        }, (error) => {
          this.msgs = [];
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.msgs.push({ severity: 'error', summary: 'Error', detail: error.error.error[i] });
            }
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error', detail: error.error });
          }
          this.loading_post = false;
        });
      }
		} else {
			this.msgs = [];
			this.msgs.push({ severity: 'warn', summary: 'Peringatan', detail: 'Rincian Belum Ditambahkan' });
		}
	}
	onShow() {}
	onHide() {
		this.uiSatuan = { kode: '', nama: '' };
    this.forms.reset();
    this.forms.patchValue({
      iddpadetd: 0,
      iddpadetdduk: 0,
      iddpa:0,
      tarif: 0
    });
    this.kode_induk = '';
    this.showThis = false;
    this.isHeader = false;
    this.msgs = [];
    this.loading_post = false;
	}
}