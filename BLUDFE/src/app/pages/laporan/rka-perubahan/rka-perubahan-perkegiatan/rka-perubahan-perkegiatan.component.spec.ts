import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkaPerubahanPerkegiatanComponent } from './rka-perubahan-perkegiatan.component';

describe('RkaPerubahanPerkegiatanComponent', () => {
  let component: RkaPerubahanPerkegiatanComponent;
  let fixture: ComponentFixture<RkaPerubahanPerkegiatanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkaPerubahanPerkegiatanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkaPerubahanPerkegiatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
