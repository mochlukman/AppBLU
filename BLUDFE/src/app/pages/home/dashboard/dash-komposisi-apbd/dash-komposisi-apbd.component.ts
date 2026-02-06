import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { ITahap } from 'src/app/core/interface/itahap';
import { ExecutesService } from 'src/app/core/services/executes.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-dash-komposisi-apbd',
  templateUrl: './dash-komposisi-apbd.component.html',
  styleUrls: ['./dash-komposisi-apbd.component.scss']
})
export class DashKomposisiApbdComponent implements OnInit, OnChanges {
  @Input() tahap: ITahap;
  @Input() unit: IDaftunit;
  dataPie1: any;
  dataPie2: any;
  dataPie3: any;
  loading_post : boolean = false;
  countReq: number = 0;
  constructor(
    private service: ExecutesService,
    private notif: NotifService
  ) { }
  
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.get()
  }
  get(){
    if(this.tahap && this.unit){
      this.loading_post = true;
      this.pie1();
      this.pie2();
      this.pie3();
    }
  }
  pie1(){
    this.service._spname = 'SP_Dashboard_chartD';
    this.service._kdtahap = this.tahap.kdtahap.trim();
    this.service._idunit = this.unit.idunit;
    this.service.gets().subscribe(resp => {
      if(resp.length > 0){
        let temp = [];
        resp.forEach(f => {
          temp.push([
            f.URAIAN,f.NILAI
          ]);
        });
        this.dataPie1 = temp;
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
  pie2(){
    this.service._spname = 'SP_Dashboard_chartR';
    this.service._kdtahap = this.tahap.kdtahap.trim();
    this.service._idunit = this.unit.idunit;
    this.service.gets().subscribe(resp => {
      if(resp.length > 0){
        let temp = [];
        resp.forEach(f => {
          temp.push([
            f.URAIAN,f.NILAI
          ]);
        });
        this.dataPie2 = temp;
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
  pie3(){
    this.service._spname = 'SP_Dashboard_chartB';
    this.service._kdtahap = this.tahap.kdtahap.trim();
    this.service._idunit = this.unit.idunit;
    this.service.gets().subscribe(resp => {
      if(resp.length > 0){
        let temp = [];
        resp.forEach(f => {
          temp.push([
            f.URAIAN,f.NILAI
          ]);
        });
        this.dataPie3 = temp;
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
    if(this.countReq == 3){
      this.loading_post = false;
      this.countReq = 0;
    }
  }
}
