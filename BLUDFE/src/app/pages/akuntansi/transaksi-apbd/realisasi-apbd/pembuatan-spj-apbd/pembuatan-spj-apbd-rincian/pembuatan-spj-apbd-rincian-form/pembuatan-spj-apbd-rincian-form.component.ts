import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {Message, SelectItem} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IDaftrekening} from 'src/app/core/interface/idaftrekening';
import {ITagihan} from 'src/app/core/interface/itagihan';
import {LookDaftrekBydpaComponent} from 'src/app/shared/lookups/look-daftrek-bydpa/look-daftrek-bydpa.component';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {SpjapbddetService} from 'src/app/core/services/spjapbddet.service';
import {InputRupiahPipe} from 'src/app/core/pipe/input-rupiah.pipe';
import {JdanaService} from 'src/app/core/services/jdana.service';
import {JtrnlkasService} from 'src/app/core/services/jtrnlkas.service';

@Component({
  selector: 'app-pembuatan-spj-apbd-rincian-form',
  templateUrl: './pembuatan-spj-apbd-rincian-form.component.html',
  styleUrls: ['./pembuatan-spj-apbd-rincian-form.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class PembuatanSpjApbdRincianFormComponent implements OnInit {
  loading_post: boolean;
  uiRek: IDisplayGlobal;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  initialForm: any;
  rekeningSelected: IDaftrekening;
  keyword: string;
  @Output() callBack = new EventEmitter();
  apbSelected: ITagihan;
  @ViewChild(LookDaftrekBydpaComponent, {static: true}) Daftrek : LookDaftrekBydpaComponent;
  listDana: SelectItem[] = [];
  danaSelected: any;
  sumberDana: string;
  listTransKas: SelectItem[] = [];
  transKasSelected: any;
  TransaksiKas: string;
  constructor(
    private service: SpjapbddetService,
    private fb: FormBuilder,
    private notif: NotifService,
    private jdanaService: JdanaService,
    private jtrnlkasService: JtrnlkasService
  ) {
    this.uiRek = {kode: '', nama: ''};
    this.forms = this.fb.group({
      idspjapbddet : 0,
      idspjapbd: [0, [Validators.required, Validators.min(1)]],
      idnojetra: [0,Validators.required],
      idjdana: [0, [Validators.required, Validators.min(1)]],
      idrek : [0, [Validators.required, Validators.min(1)]],
      nilai : [0]
    });
    this.initialForm = this.forms.value;
  }
  ngOnInit(){
  }
  lookDaftrek(){
    if(this.apbSelected){
      this.Daftrek.title = 'Pilih Rekening';
      this.Daftrek._idunit = this.apbSelected.idunit;
      this.Daftrek._idkeg = this.apbSelected.idkeg;
      this.Daftrek._Mtglevel = '6';
      this.Daftrek._kdperStartwith = this.apbSelected.kdstatus.trim() == '82' ? '5.' : 'non-modal';
      this.Daftrek.showThis=true;
    }
  }
  callBackDaftrek(e: IDaftrekening){
    this.rekeningSelected = e;
    this.uiRek = {
      kode: this.rekeningSelected.kdper,
      nama: this.rekeningSelected.nmper
    };
    this.forms.patchValue({
      idrek: this.rekeningSelected.idrek
    });
  }
  getDana(){
    this.listDana = [
      {label: 'Pilih', value: null}
    ];
    this.jdanaService.gets()
      .subscribe(resp => {
        let temp: any[] = [];
        if(resp.length > 0 ){
          temp = resp;
          temp.forEach(e => {
            this.listDana.push({label: `${e.kddana} - ${e.nmdana}`, value: e.idjdana})
          });
        }
        if(this.mode === 'edit'){
          if(this.forms.value.idjdana != 0){
            this.danaSelected = this.listDana.find(w => w.value == this.forms.value.idjdana).value;
            if(temp.length > 0){
              let jdana = temp.find(f => f.idjdana == this.forms.value.idjdana);
              if(jdana != null){
                this.sumberDana =  `${jdana.kddana} - ${jdana.nmdana}`;
              }
            }

          }
        }
      });
  }
  changeDana(e: any){
    if(e.value){
      this.forms.patchValue({
        idjdana:  e.value,
      });
    } else {
      this.forms.patchValue({
        idjdana: 0,
      });
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Sumber Dana'});
    }
  }
  getTransKas(){
    this.listTransKas = [
      {label: 'Pilih', value: null}
    ];
    this.jtrnlkasService.gets({idnojetra: '41'})
      .subscribe(resp => {
        let temp: any[] = [];
        if(resp.length > 0 ){
          temp = resp;
          temp.forEach(e => {
            this.listTransKas.push({label: `${e.nmjetra}`, value: e.idnojetra})
          });
        }
        if(this.mode === 'edit'){
          if(this.forms.value.idnojetra != 0){
            this.transKasSelected = this.listTransKas.find(w => w.value == this.forms.value.idnojetra).value;
            if(temp.length > 0){
              let trans = temp.find(f => f.idnojetra == this.forms.value.idnojetra);
              if(trans != null){
                this.TransaksiKas =  `${trans.nmjetra}`;
              }
            }

          }
        }
      });
  }
  changeTransKas(e: any){
    if(e.value){
      this.forms.patchValue({
        idnojetra:  e.value,
      });
    } else {
      this.forms.patchValue({
        idnojetra: 0,
      });
      this.msg = [];
      this.msg.push({severity: 'warn', summary: 'Peringatan', detail: 'Pilih Transaksi Kas'});
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
    this.getDana();
    this.getTransKas();
  }
  onHide(){
    this.forms.reset(this.initialForm);
    this.uiRek = {kode: '', nama: ''};
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.keyword = null;
    this.rekeningSelected = null;
  }
}
