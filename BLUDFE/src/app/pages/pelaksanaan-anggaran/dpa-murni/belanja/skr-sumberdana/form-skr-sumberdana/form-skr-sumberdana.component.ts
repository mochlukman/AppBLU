import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IJdana } from 'src/app/core/interface/ijdana';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpadanarService } from 'src/app/core/services/dpadanar.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookJdanaComponent } from 'src/app/shared/lookups/look-jdana/look-jdana.component';

@Component({
  selector: 'app-form-skr-sumberdana',
  templateUrl: './form-skr-sumberdana.component.html',
  styleUrls: ['./form-skr-sumberdana.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormSkrSumberdanaComponent implements OnInit {
  loading_post: boolean;
  title: string;
  mode: string;
  showThis: boolean;
	userInfo: ITokenClaim;
	uiDana: IDisplayGlobal;
	forms: FormGroup;
  msgs: Message[];
	@ViewChild(LookJdanaComponent,{static: true}) lookDana: LookJdanaComponent;
  @Output() callBack = new EventEmitter();
	constructor(
		private auth: AuthenticationService,
		private fb: FormBuilder,
		private service: DpadanarService,
		private notif: NotifService
	) {
		this.userInfo = this.auth.getTokenInfo();
		this.uiDana = {kode: '', nama: ''};
		this.forms = this.fb.group({
      iddpadanar : [0],
      iddpar : [0 , Validators.required],
      idjdana : [0],
      nilai : [0]
		});
	}

	ngOnInit() {}
	getDana() {
		this.lookDana.gets();
		this.lookDana.showThis = true;
	}
	callbackDana(e: IJdana){
		this.forms.patchValue({
			idjdana: e.idjdana
		});
		this.uiDana = {kode: e.kddana, nama: e.nmdana};
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
		this.uiDana = { kode: '', nama: '' };
    this.forms.reset();
    this.forms.patchValue({
      iddpadanar : 0,
      iddpar : 0,
      idjdana : 0,
      nilai : 0,
    });
    this.showThis = false;
    this.msgs = [];
    this.loading_post = false;
	}
}
