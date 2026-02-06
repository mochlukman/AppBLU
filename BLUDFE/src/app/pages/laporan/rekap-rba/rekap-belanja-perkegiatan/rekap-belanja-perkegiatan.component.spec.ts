import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekapBelanjaPerkegiatanComponent } from './rekap-belanja-perkegiatan.component';

describe('RekapBelanjaPerkegiatanComponent', () => {
  let component: RekapBelanjaPerkegiatanComponent;
  let fixture: ComponentFixture<RekapBelanjaPerkegiatanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekapBelanjaPerkegiatanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekapBelanjaPerkegiatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
