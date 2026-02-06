import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRbaapbdComponent } from './map-rbaapbd.component';

describe('MapRbaapbdComponent', () => {
  let component: MapRbaapbdComponent;
  let fixture: ComponentFixture<MapRbaapbdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRbaapbdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRbaapbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
