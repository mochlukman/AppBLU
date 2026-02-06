import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarBendaharaComponent } from './daftar-bendahara.component';

describe('DaftarBendaharaComponent', () => {
  let component: DaftarBendaharaComponent;
  let fixture: ComponentFixture<DaftarBendaharaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarBendaharaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarBendaharaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
