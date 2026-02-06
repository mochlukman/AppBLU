import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpaPerubahanPerkegiatanComponent } from './dpa-perubahan-perkegiatan.component';

describe('DpaPerubahanPerkegiatanComponent', () => {
  let component: DpaPerubahanPerkegiatanComponent;
  let fixture: ComponentFixture<DpaPerubahanPerkegiatanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpaPerubahanPerkegiatanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpaPerubahanPerkegiatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
