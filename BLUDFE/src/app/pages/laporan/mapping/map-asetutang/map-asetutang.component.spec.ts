import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAsetutangComponent } from './map-asetutang.component';

describe('MapAsetutangComponent', () => {
  let component: MapAsetutangComponent;
  let fixture: ComponentFixture<MapAsetutangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAsetutangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAsetutangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
