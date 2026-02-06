import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealBelanjaDanabokComponent } from './real-belanja-danabok.component';

describe('RealBelanjaDanabokComponent', () => {
  let component: RealBelanjaDanabokComponent;
  let fixture: ComponentFixture<RealBelanjaDanabokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealBelanjaDanabokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealBelanjaDanabokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
