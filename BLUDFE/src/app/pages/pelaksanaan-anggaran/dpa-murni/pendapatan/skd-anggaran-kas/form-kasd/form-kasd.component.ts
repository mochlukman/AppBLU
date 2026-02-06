import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { DpablndService } from 'src/app/core/services/dpablnd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-form-kasd',
  templateUrl: './form-kasd.component.html',
  styleUrls: ['./form-kasd.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormKasdComponent implements OnInit {
  loading_post: boolean;
  title: string;
  showThis: boolean;
	forms: FormGroup;
  msgs: Message[];
  @Output() callBack = new EventEmitter();
	constructor(
		private fb: FormBuilder,
		private service: DpablndService,
		private notif: NotifService
	) {
		this.forms = this.fb.group({
      iddpablnd: [0, Validators.required],
      iddpad: [0, Validators.required],
      idbulan: [0, Validators.required],
      ketbulan: [''],
      nilai:[0, Validators.required]
		});
	}

	ngOnInit() {}
	simpan() {
		if (this.forms.valid) {
      this.loading_post = true;
      this.service.put(this.forms.value).subscribe((resp) => {
        if (resp.ok) {
          this.callBack.emit({
            edited: true,
            data: resp.body
          });
          this.onHide();
          this.notif.success('Nilai Berhasil Diubah');
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
		} else {
			this.msgs = [];
			this.msgs.push({ severity: 'warn', summary: 'Peringatan', detail: 'Rincian Belum Ditambahkan' });
		}
	}
	onShow() {}
	onHide() {
    this.forms.reset();
    this.forms.patchValue({
      iddpablnd: 0,
      iddpad: 0,
      idbulan: 0,
      ketbulan: '',
      nilai:0
    });
    this.showThis = false;
    this.msgs = [];
    this.loading_post = false;
	}
}