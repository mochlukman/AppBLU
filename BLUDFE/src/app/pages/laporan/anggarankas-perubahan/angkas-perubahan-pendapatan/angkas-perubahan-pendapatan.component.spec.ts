import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngkasPerubahanPendapatanComponent } from './angkas-perubahan-pendapatan.component';

describe('AngkasPerubahanPendapatanComponent', () => {
  let component: AngkasPerubahanPendapatanComponent;
  let fixture: ComponentFixture<AngkasPerubahanPendapatanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngkasPerubahanPendapatanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngkasPerubahanPendapatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
