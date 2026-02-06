import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { ITahap } from 'src/app/core/interface/itahap';
import { ExecutesService } from 'src/app/core/services/executes.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-dash-apbd',
  templateUrl: './dash-apbd.component.html',
  styleUrls: ['./dash-apbd.component.scss']
})
export class DashApbdComponent implements OnInit, OnChanges {
  @Input() tahap: ITahap;
  @Input() unit: IDaftunit;
  jumProgram: number = 0;
  jumKegiatan: number = 0;
  nilaiPendapatan: number = 0;
  nilaiBelanja: number = 0;
  nilaiPenerimaanTr: number = 0;
  nilaiPenerimaanKr: number = 0;
  countReq: number = 0;
  loading_post: boolean = false;
  constructor(
    private service: ExecutesService,
    private notif: NotifService
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    this.get();
  }
  get(){
    if(this.tahap && this.unit){
      this.loading_post = true;
      this.card1();
      this.card2();
      this.card3();
      this.card4();
      this.card5a();
      this.card5b();
    }
  }
  card1(){
    this.service._spname = 'SP_Dashboard_Jumpgrm';
    this.service._kdtahap = this.tahap.kdtahap.trim();
    this.service._idunit = this.unit.idunit;
    this.service.gets().subscribe(resp => {
      if(resp.length > 0){
        if(resp[0].JUMPGRM){
          this.jumProgram = resp[0].JUMPGRM;
        } else {
          this.jumProgram = 0;
        }
      }
    },(error) => {
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    },() => {
      this.countReq += 1;
      this.stopLoading();
    });
  }
  card2(){
    this.service._spname = 'SP_Dashboard_Jumkeg';
    this.service._kdtahap = this.tahap.kdtahap.trim();
    this.service._idunit = this.unit.idunit;
    this.service.gets().subscribe(resp => {
      if(resp.length > 0){
        if(resp[0].JUMKEG){
          this.jumKegiatan = resp[0].JUMKEG;
        } else {
          this.jumKegiatan = 0;
        }
      }
    },(error) => {
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    },() => {
      this.countReq += 1;
      this.stopLoading();
    });
  }
  card3(){
    this.service._spname = 'SP_Dashboard_RKAD';
    this.service._kdtahap = this.tahap.kdtahap.trim();
    this.service._idunit = this.unit.idunit;
    this.service.gets().subscribe(resp => {
      if(resp.length > 0){
        if(resp[0].NILAI){
          this.nilaiPendapatan = resp[0].NILAI;
        } else {
          this.nilaiPendapatan = 0;
        }
      }
    },(error) => {
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    },() => {
      this.countReq += 1;
      this.stopLoading();
    });
  }
  card4(){
    this.service._spname = 'SP_Dashboard_RKAR';
    this.service._kdtahap = this.tahap.kdtahap.trim();
    this.service._idunit = this.unit.idunit;
    this.service.gets().subscribe(resp => {
      if(resp.length > 0){
        if(resp[0].NILAI){
          this.nilaiBelanja = resp[0].NILAI;
        } else {
          this.nilaiBelanja = 0;
        }
      }
    },(error) => {
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    },() => {
      this.countReq += 1;
      this.stopLoading();
    });
  }
  card5a(){
    this.service._spname = 'SP_Dashboard_RKABtr';
    this.service._kdtahap = this.tahap.kdtahap.trim();
    this.service._idunit = this.unit.idunit;
    this.service.gets().subscribe(resp => {
      if(resp.length > 0){
        if(resp[0].NILAI){
          this.nilaiPenerimaanTr = resp[0].NILAI;
        } else {
          this.nilaiPenerimaanTr = 0;
        }
      }
    },(error) => {
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    },() => {
      this.countReq += 1;
      this.stopLoading();
    });
  }
  card5b(){
    this.service._spname = 'SP_Dashboard_RKABkr';
    this.service._kdtahap = this.tahap.kdtahap.trim();
    this.service._idunit = this.unit.idunit;
    this.service.gets().subscribe(resp => {
      if(resp.length > 0){
        if(resp[0].NILAI){
          this.nilaiPenerimaanKr = resp[0].NILAI;
        } else {
          this.nilaiPenerimaanKr = 0;
        }
      }
    },(error) => {
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    },() => {
      this.countReq += 1;
      this.stopLoading();
    });
  }
  stopLoading(){
    if(this.countReq == 6){
      this.loading_post = false;
      this.countReq = 0;
    }
    
  }
}
