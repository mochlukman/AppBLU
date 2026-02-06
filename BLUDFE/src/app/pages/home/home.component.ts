import { Component, OnInit, ViewChild } from '@angular/core';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import { LookDaftrekBykodeComponent } from 'src/app/shared/lookups/look-daftrek-bykode/look-daftrek-bykode.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  tes(){
  }
  callback(e: any){
    console.log(e);
  }
}
