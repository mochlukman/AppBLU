import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { ITahap } from 'src/app/core/interface/itahap';
import { ExecutesService } from 'src/app/core/services/executes.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-dash-komposisi-urusan-daerah',
  templateUrl: './dash-komposisi-urusan-daerah.component.html',
  styleUrls: ['./dash-komposisi-urusan-daerah.component.scss']
})
export class DashKomposisiUrusanDaerahComponent implements OnInit, OnChanges {
  @Input() tahap: ITahap;
  @Input() unit: IDaftunit;
  data: any;
  loading_post: boolean = false;
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
      this.pie();
    }
  }
  pie(){
    this.loading_post = true;
    this.service._spname = 'SP_Dashboard_chartUrusAPBD';
    this.service._kdtahap = this.tahap.kdtahap.trim();
    this.service._idunit = 99999; //99999 idunit tidak di gunakan di SP
    this.service.gets().subscribe(resp => {
      if(resp.length > 0){
        let temp = [];
        resp.forEach(f => {
          temp.push([
            f.URAIAN,f.NILAI
          ]);
        });
        this.data = temp;
      }
      this.loading_post = false;
    },(error) => {
      this.loading_post = false;
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
