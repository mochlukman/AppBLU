import { SharedAnimations } from 'src/app/landing/shared/animations/shared-animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-six',
  templateUrl: './intro-six.component.html',
  styleUrls: ['./intro-six.component.scss'],
  animations:[SharedAnimations]
})
export class IntroSixComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  login(){
    this.router.navigate(['/login'], {state: {reload: true}});
  }
}
