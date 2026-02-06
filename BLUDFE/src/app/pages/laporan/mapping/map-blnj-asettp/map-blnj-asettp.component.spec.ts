import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBlnjAsettpComponent } from './map-blnj-asettp.component';

describe('MapBlnjAsettpComponent', () => {
  let component: MapBlnjAsettpComponent;
  let fixture: ComponentFixture<MapBlnjAsettpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapBlnjAsettpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBlnjAsettpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
