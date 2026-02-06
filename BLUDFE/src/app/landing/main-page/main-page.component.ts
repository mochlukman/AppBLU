import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit {
  visibelPage: boolean;
  backgroundColor = "landing-indigo";
  showCustomizer = false;
  constructor() {}

  ngOnInit() {
    if(history.state.reload){
      this.visibelPage = false;
      window.location.reload();
    } else {
      this.visibelPage = true;
    }
  }

  changeBg(colorName) {
    this.backgroundColor = "landing-" + colorName;
  }
  toggleCustomizer() {
    this.showCustomizer = !this.showCustomizer;
  }
}
