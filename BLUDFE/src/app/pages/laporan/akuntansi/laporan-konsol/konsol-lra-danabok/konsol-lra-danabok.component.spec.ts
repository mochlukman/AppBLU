import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsolLraDanabokComponent } from './konsol-lra-danabok.component';

describe('KonsolLraDanabokComponent', () => {
  let component: KonsolLraDanabokComponent;
  let fixture: ComponentFixture<KonsolLraDanabokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonsolLraDanabokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonsolLraDanabokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
