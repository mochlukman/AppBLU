import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BukuTerimaSetorComponent } from './buku-terima-setor.component';

describe('BukuTerimaSetorComponent', () => {
  let component: BukuTerimaSetorComponent;
  let fixture: ComponentFixture<BukuTerimaSetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BukuTerimaSetorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BukuTerimaSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
