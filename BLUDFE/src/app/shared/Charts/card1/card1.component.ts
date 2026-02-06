import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Rupiah from 'src/app/core/helpers/rupiah';

@Component({
  selector: 'app-card1',
  templateUrl: './card1.component.html',
  styleUrls: ['./card1.component.scss']
})
export class Card1Component implements OnInit, OnChanges {
  @Input() bgcolor: string;
  @Input() title: string;
  @Input() value: any;
  @Input() formatValue: string = 'decimal';
  @Input() valueSub: string[] = [];
  multipleValue: boolean = false;
  constructor() { } 
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(typeof this.value == 'string' || typeof this.value == 'number'){
      if(this.formatValue == 'rupiah'){
        let rupiah = new Rupiah(+this.value);
        this.value = rupiah.format;
      }
    } else {
      this.multipleValue = true;
      if(this.value.length > 0){
        let newValue = [];
        for(var i = 0; i < this.value.length; i ++){
          let rupiah = new Rupiah(this.value[i]);
          newValue.push(rupiah.format);
        }
        this.value = newValue;
      }
    }
  }

}
