import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkaPerkegiatanComponent } from './rka-perkegiatan.component';

describe('RkaPerkegiatanComponent', () => {
  let component: RkaPerkegiatanComponent;
  let fixture: ComponentFixture<RkaPerkegiatanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkaPerkegiatanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkaPerkegiatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
