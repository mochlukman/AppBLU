import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LraPeriodeComponent } from './lra-periode.component';

describe('LraPeriodeComponent', () => {
  let component: LraPeriodeComponent;
  let fixture: ComponentFixture<LraPeriodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LraPeriodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LraPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
