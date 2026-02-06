import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LampSpbBokComponent } from './lamp-spb-bok.component';

describe('LampSpbBokComponent', () => {
  let component: LampSpbBokComponent;
  let fixture: ComponentFixture<LampSpbBokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampSpbBokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LampSpbBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
