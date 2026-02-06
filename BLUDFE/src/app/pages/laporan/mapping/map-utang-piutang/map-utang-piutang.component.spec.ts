import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapUtangPiutangComponent } from './map-utang-piutang.component';

describe('MapUtangPiutangComponent', () => {
  let component: MapUtangPiutangComponent;
  let fixture: ComponentFixture<MapUtangPiutangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapUtangPiutangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapUtangPiutangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
