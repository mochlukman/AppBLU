import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpaskpdComponent } from './dpaskpd.component';

describe('DpaskpdComponent', () => {
  let component: DpaskpdComponent;
  let fixture: ComponentFixture<DpaskpdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpaskpdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpaskpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
