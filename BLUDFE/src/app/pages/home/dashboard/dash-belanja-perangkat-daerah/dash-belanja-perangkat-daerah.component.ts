import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITahap } from 'src/app/core/interface/itahap';
import { ExecutesService } from 'src/app/core/services/executes.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-dash-belanja-perangkat-daerah',
  templateUrl: './dash-belanja-perangkat-daerah.component.html',
  styleUrls: ['./dash-belanja-perangkat-daerah.component.scss']
})
export class DashBelanjaPerangkatDaerahComponent implements OnInit, OnChanges {
  @Input() tahap: ITahap;
  databar: any;
  listdata: any[] = [];
  loading: boolean;
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
    if(this.tahap){
      this.Bars();
    }
  }
  Bars(){
    this.loading = true;
    this.service._spname = 'SP_Dashboard_gridRekapAPBD';
    this.service._kdtahap = this.tahap.kdtahap.trim();
    this.service._idunit = 99999; //99999 idunit tidak di gunakan di SP
    this.service.gets().subscribe(resp => {
      let temp = {
        categories: [],
        series: []
      }
      if(resp.length > 0){
        let PENDAPATAN = [];
        let KUA = [];
        let APBD = [];
        let PEMBIAYAAN = []
        resp.forEach(f => {
          temp.categories.push(f.URAIAN.trim());
          PENDAPATAN.push(f.PENDAPATAN);
          KUA.push(f.KUA);
          APBD.push(f.APBD);
          PEMBIAYAAN.push(f.PEMBIAYAAN);
        });
        temp.series = [
          {
            name: 'PENDAPATAN',
            data: PENDAPATAN
          },
          {
            name: 'KUA',
            data: KUA
          },
          {
            name: 'APBD',
            data: APBD
          },
           {
            name: 'PEMBIAYAAN',
            data: PEMBIAYAAN
          }
        ];
      }
      this.databar = temp;
      this.listdata = resp;
      this.loading = false;
    },(error) => {
      this.loading = false;
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    });
  }
}
