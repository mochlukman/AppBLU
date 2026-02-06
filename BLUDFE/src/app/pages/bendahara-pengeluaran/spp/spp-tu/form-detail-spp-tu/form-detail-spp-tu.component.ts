import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { ICheckRekening } from 'src/app/core/interface/iglobal';
import { ISppdetr, ISppdetrPostMultiKeg } from 'src/app/core/interface/isppdetr';
import { InputRupiahPipe } from 'src/app/core/pipe/input-rupiah.pipe';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookTreeRekByDpaComponent } from 'src/app/shared/lookups/look-tree-rek-by-dpa/look-tree-rek-by-dpa.component';

@Component({
  selector: 'app-form-detail-spp-tu',
  templateUrl: './form-detail-spp-tu.component.html',
  styleUrls: ['./form-detail-spp-tu.component.scss'],
  providers: [ InputRupiahPipe ]
})
export class FormDetailSppTuComponent implements OnInit {
  loading_post: boolean;
  showThis: boolean;
  title: string;
  mode: string;
  msg: Message[];
  forms: FormGroup;
  @Output() callback = new EventEmitter();
  @ViewChild(LookTreeRekByDpaComponent,{static: true}) LookRek: LookTreeRekByDpaComponent;
  constructor(
    private fb: FormBuilder,
    private notif: NotifService,
    private service: SppdetrService
  ) {
    this.forms = this.fb.group({
      idunit: 0,
      idspp:0,
      idnojetra:0,
      kdtahap: '',
      idxkode: 0,
      kdstatus: ''
    });
  }
  ngOnInit(){
  }
  showRek(){
    this.LookRek.title = 'Pilih Rekening';
    this.LookRek.get(
      this.forms.value.idunit,
      this.forms.value.idspp,
      this.forms.value.kdtahap,
      this.forms.value.idnojetra,
      this.forms.value.idxkode,
      this.forms.value.kdstatus);
    this.LookRek.showThis = true;
  }
  callbackRek(e: ICheckRekening[]){
    if(e[0].Batal){
      this.onHide();
    } else {
      if(e.length > 0){
        let temp: ISppdetrPostMultiKeg[] = [];
        e.forEach(f => {
          if(f.Idrek.length > 0){
            for(var i = 0; i < f.Idrek.length; i++){
              temp.push({
                idkeg : f.Idkeg,
                idspp : this.forms.value.idspp,
                idnojetra : this.forms.value.idnojetra,
                idrek : f.Idrek[i],
                nilai: 0
              });
            }
          }
        });
        this.simpan(temp);
      }
    }
  }
  simpan(data: ISppdetrPostMultiKeg[]){
    this.loading_post = true;
    this.service.postMultiKeg(data).subscribe((resp) => {
      if (resp.ok) {
        this.callback.emit({
          added: true
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
  onShow(){
    this.showRek();
  }
  onHide(){
    this.forms.reset();
    this.forms.patchValue({
      idsppdetr : 0,
      idrek : '',
      idkeg : 0,
      idspp : 0,
      nilai : 0,
      idspd: 0,
      idunit: 0,
      idxkode: 0,
      kdstatus: ''
    });
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
  }
}