import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpkunitComponent } from './ppkunit.component';

describe('PpkunitComponent', () => {
  let component: PpkunitComponent;
  let fixture: ComponentFixture<PpkunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpkunitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpkunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
