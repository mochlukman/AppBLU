import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsolLraComponent } from './konsol-lra.component';

describe('KonsolLraComponent', () => {
  let component: KonsolLraComponent;
  let fixture: ComponentFixture<KonsolLraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonsolLraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonsolLraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
