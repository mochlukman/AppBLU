import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpAruskasComponent } from './lp-aruskas.component';

describe('LpAruskasComponent', () => {
  let component: LpAruskasComponent;
  let fixture: ComponentFixture<LpAruskasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpAruskasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpAruskasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
