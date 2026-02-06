import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealPendapatanDanabokComponent } from './real-pendapatan-danabok.component';

describe('RealPendapatanDanabokComponent', () => {
  let component: RealPendapatanDanabokComponent;
  let fixture: ComponentFixture<RealPendapatanDanabokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealPendapatanDanabokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealPendapatanDanabokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
