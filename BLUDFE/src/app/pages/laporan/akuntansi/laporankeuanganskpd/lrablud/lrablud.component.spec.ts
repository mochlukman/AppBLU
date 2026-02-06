import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LrabludComponent } from './lrablud.component';

describe('LrabludComponent', () => {
  let component: LrabludComponent;
  let fixture: ComponentFixture<LrabludComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LrabludComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LrabludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
