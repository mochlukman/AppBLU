import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAruskasComponent } from './map-aruskas.component';

describe('MapAruskasComponent', () => {
  let component: MapAruskasComponent;
  let fixture: ComponentFixture<MapAruskasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAruskasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAruskasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
