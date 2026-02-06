import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekapRbaComponent } from './rekap-rba.component';

describe('RekapRbaComponent', () => {
  let component: RekapRbaComponent;
  let fixture: ComponentFixture<RekapRbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekapRbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekapRbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
