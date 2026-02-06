import { Component, OnInit } from '@angular/core';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { ITahap } from 'src/app/core/interface/itahap';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { TahapService } from 'src/app/core/services/tahap.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title: string = '';
  idunit: number = 0; // kondisi saat unit login
  listtahap: ITahap[] = [];
  tahapselected: ITahap;
  listunit: IDaftunit[] = [];
  unitselected: IDaftunit;
  userInfo: ITokenClaim;
  constructor(
    private global: GlobalService,
    private tahapService: TahapService,
    private unitService: DaftunitService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.authService.getTokenInfo();
    if(this.userInfo.Idunit != 0) this.idunit = +this.userInfo.Idunit;
  }

  ngOnInit() {
    this.getTahap();
    this.getUnit();
  }
  getTahap(){
    this.listtahap = [];
    this.tahapService.getsBykode('321,341').subscribe(resp => {
      if(resp.length > 0){
        this.listtahap = [...resp];
        if(this.userInfo.KdTahap != ''){
          this.tahapselected = this.listtahap.find(f => f.kdtahap.trim() == this.userInfo.KdTahap);
          this.changeTahap(this.tahapselected);
        }
      } else {
        this.notif.info('Daftar Tahap Tidak Tersedia');
      }
    }, (error) => {
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    });
  }
  changeTahap(e: any){
  }
  getUnit(){
    this.listunit = [];
    this.unitService.gets('3,4').subscribe(resp => {
      if(resp.length > 0){
        let all_data: IDaftunit = {
          idunit: 0,
          nmunit: 'Pilih Semua',
          idpemda: null,
          idurus: 0,
          kdunit: '',
          kdlevel: 0,
          type:'',
          akrounit: null,
          alamat: '',
          telepon: null,
          staktif: 0,
          datecreate: '',
          dateupdate: '',
          combine: '',
          idurusNavigation : null,
	        kdlevelNavigation : null
        };
        this.listunit.push(all_data);
        // let newdata = temp1.concat(temp1, resp);
        // console.log(this.listdata);
        this.listunit = this.listunit.concat(resp);
        if(this.idunit != 0){
          this.unitselected = this.listunit.find(f => f.idunit == this.idunit);
          this.changeUnit(this.unitselected);
        }
      } else {
        this.notif.info('Data Tidak Tersedia');
      }
    }, (error) => {
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    });
  }
  changeUnit(e: IDaftunit){
  }
}
