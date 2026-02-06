import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpSalComponent } from './lp-sal.component';

describe('LpSalComponent', () => {
  let component: LpSalComponent;
  let fixture: ComponentFixture<LpSalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpSalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpSalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
