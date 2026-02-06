import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapUtangPfkComponent } from './map-utang-pfk.component';

describe('MapUtangPfkComponent', () => {
  let component: MapUtangPfkComponent;
  let fixture: ComponentFixture<MapUtangPfkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapUtangPfkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapUtangPfkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
