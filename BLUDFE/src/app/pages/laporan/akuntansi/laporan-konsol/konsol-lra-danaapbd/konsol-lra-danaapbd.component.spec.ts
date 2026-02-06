import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsolLraDanaapbdComponent } from './konsol-lra-danaapbd.component';

describe('KonsolLraDanaapbdComponent', () => {
  let component: KonsolLraDanaapbdComponent;
  let fixture: ComponentFixture<KonsolLraDanaapbdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonsolLraDanaapbdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonsolLraDanaapbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
