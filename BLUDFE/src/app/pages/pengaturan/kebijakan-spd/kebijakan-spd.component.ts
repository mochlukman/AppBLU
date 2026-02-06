import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { WebsetService } from 'src/app/core/services/webset.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-kebijakan-spd',
  templateUrl: './kebijakan-spd.component.html',
  styleUrls: ['./kebijakan-spd.component.scss']
})
export class KebijakanSpdComponent implements OnInit, OnDestroy {
  title: string = '';
  formFilter: FormGroup;
  initialForm: any;
  userInfo: ITokenClaim;
  kebijakan: string;
  constructor(
    private service : WebsetService,
    private notif: NotifService,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.formFilter = this.fb.group({
      idwebset : [0, [Validators.required, Validators.min(0)]],
      kdset : ['', Validators.required],
      valset : '',
      valdesc : '',
      modeentry : 0,
      vallist : ''
    });
    this.initialForm = this.formFilter.value;
  }

  ngOnInit() {
    this.get();
  }
  get(){
    this.service.byKdset('alokas')
      .subscribe(resp => {
        if(resp.idwebset){
          this.formFilter.patchValue({
            idwebset : resp.idwebset,
            kdset : resp.kdset,
            valset : resp.valset,
            valdesc : resp.valdesc,
            modeentry : resp.modeentry,
            vallist : resp.vallist,
          });
          this.kebijakan = resp.valset.trim()
        }
      },(error) => {
        if(Array.isArray(error.error.error)){
          for(let i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
  }
  clickKebijakan(){
    this.formFilter.patchValue({
      valset: this.kebijakan.trim()
    });
    this.service.put(this.formFilter.value).subscribe(resp => {
      if(resp.ok){
        this.formFilter.patchValue({
          valset: resp.body['valset'].trim()
        });
        this.notif.success(`Data Berhasil Diubah`);
      }
    },(error) => {
      if(Array.isArray(error.error.error)){
        for(let i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    });
  }
  ngOnDestroy(): void {
    this.formFilter.reset(this.initialForm);
  }

}
