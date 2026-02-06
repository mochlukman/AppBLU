import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PimBludComponent } from './pim-blud.component';

describe('PimBludComponent', () => {
  let component: PimBludComponent;
  let fixture: ComponentFixture<PimBludComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PimBludComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PimBludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
