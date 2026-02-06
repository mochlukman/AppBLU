import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekapSilpaComponent } from './rekap-silpa.component';

describe('RekapSilpaComponent', () => {
  let component: RekapSilpaComponent;
  let fixture: ComponentFixture<RekapSilpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekapSilpaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekapSilpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
