import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsolRbaComponent } from './konsol-rba.component';

describe('KonsolRbaComponent', () => {
  let component: KonsolRbaComponent;
  let fixture: ComponentFixture<KonsolRbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonsolRbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonsolRbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
