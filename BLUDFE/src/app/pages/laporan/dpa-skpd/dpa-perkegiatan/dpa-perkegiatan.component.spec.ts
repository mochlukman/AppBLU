import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpaPerkegiatanComponent } from './dpa-perkegiatan.component';

describe('DpaPerkegiatanComponent', () => {
  let component: DpaPerkegiatanComponent;
  let fixture: ComponentFixture<DpaPerkegiatanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpaPerkegiatanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpaPerkegiatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
