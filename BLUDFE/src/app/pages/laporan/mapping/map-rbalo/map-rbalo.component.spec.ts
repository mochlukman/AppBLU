import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRbaloComponent } from './map-rbalo.component';

describe('MapRbaloComponent', () => {
  let component: MapRbaloComponent;
  let fixture: ComponentFixture<MapRbaloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRbaloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRbaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
