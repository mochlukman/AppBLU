import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekApbdComponent } from './rek-apbd.component';

describe('RekApbdComponent', () => {
  let component: RekApbdComponent;
  let fixture: ComponentFixture<RekApbdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekApbdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekApbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
