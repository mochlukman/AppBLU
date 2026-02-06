import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IJsatuan } from 'src/app/core/interface/ijsatuan';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SshService } from 'src/app/core/services/ssh.service';
import { LookDaftbarangComponent } from 'src/app/shared/lookups/look-daftbarang/look-daftbarang.component';
import { LookJsatuanComponent } from 'src/app/shared/lookups/look-jsatuan/look-jsatuan.component';

@Component({
  selector: 'app-asb-form',
  templateUrl: './asb-form.component.html',
  styleUrls: ['./asb-form.component.scss'],
  providers: [InputRupiahPipe]
})
export class AsbFormComponent implements OnInit {
  showThis: boolean;
  loading_post: boolean;
  title: string;
  mode: string;
  forms: FormGroup;
  msg: Message[];
  userInfo: ITokenClaim;
  initialForm: any;
  uiSatuan: IDisplayGlobal;
  uiBarang: IDisplayGlobal;
  @Output() callback = new EventEmitter();
  @ViewChild(LookDaftbarangComponent, {static: true}) lookBarang: LookDaftbarangComponent;
  @ViewChild(LookJsatuanComponent,{static: true}) lookSatuan: LookJsatuanComponent;
  constructor(
    private service: SshService,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { 
    this.userInfo = this.authService.getTokenInfo();
    this.forms = this.fb.group({
      idssh: 0,
      idbrg: [0, [Validators.required, Validators.min(1)]],
      kdssh: ['', Validators.required],
      kode: '',
      uraian: '',
      spek: '',
      satuan: '',
      kdsatuan: '',
      harga: 0,
      kelompok: ['3', Validators.required]
    });
    this.initialForm = this.forms.value;
    this.uiSatuan = {kode: '', nama: ''};
    this.uiBarang = {kode: '', nama: ''};
  }
  ngOnInit() {
  }
  getBarang(){
    this.lookBarang.title = 'Pilih Barang';
    this.lookBarang.showThis = true;
  }
  callbackBarang(e: any){
    this.forms.patchValue({
      idbrg: e.idbrg
    });
    this.uiBarang = {kode: e.kdbrg, nama: e.nmbrg};
  }
  getSatuan() {
    this.lookSatuan.title = 'Pilih Satuan';
		this.lookSatuan.gets();
		this.lookSatuan.showThis = true;
	}
	callBackSatuan(e: IJsatuan){
		this.forms.patchValue({
			satuan: e.uraisatuan,
			kdsatuan: e.kdsatuan
		});
		this.uiSatuan = {kode: e.kdsatuan, nama: e.uraisatuan};
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
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.msg = [];
    this.loading_post = false;
    this.showThis = false;
    this.uiSatuan = {kode: '', nama: ''};
    this.uiBarang = {kode: '', nama: ''};
  }
}