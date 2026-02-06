import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngkasPerubahanPembiayaanComponent } from './angkas-perubahan-pembiayaan.component';

describe('AngkasPerubahanPembiayaanComponent', () => {
  let component: AngkasPerubahanPembiayaanComponent;
  let fixture: ComponentFixture<AngkasPerubahanPembiayaanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngkasPerubahanPembiayaanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngkasPerubahanPembiayaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
