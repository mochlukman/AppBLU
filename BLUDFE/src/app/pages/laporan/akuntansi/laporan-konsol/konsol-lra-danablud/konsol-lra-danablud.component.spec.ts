import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsolLraDanabludComponent } from './konsol-lra-danablud.component';

describe('KonsolLraDanabludComponent', () => {
  let component: KonsolLraDanabludComponent;
  let fixture: ComponentFixture<KonsolLraDanabludComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonsolLraDanabludComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonsolLraDanabludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
