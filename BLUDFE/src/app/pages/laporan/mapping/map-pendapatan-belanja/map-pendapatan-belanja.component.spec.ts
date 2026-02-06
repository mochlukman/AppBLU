import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPendapatanBelanjaComponent } from './map-pendapatan-belanja.component';

describe('MapPendapatanBelanjaComponent', () => {
  let component: MapPendapatanBelanjaComponent;
  let fixture: ComponentFixture<MapPendapatanBelanjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPendapatanBelanjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPendapatanBelanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
