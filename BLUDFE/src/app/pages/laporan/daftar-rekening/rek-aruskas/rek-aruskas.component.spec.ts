import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekAruskasComponent } from './rek-aruskas.component';

describe('RekAruskasComponent', () => {
  let component: RekAruskasComponent;
  let fixture: ComponentFixture<RekAruskasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekAruskasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekAruskasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
