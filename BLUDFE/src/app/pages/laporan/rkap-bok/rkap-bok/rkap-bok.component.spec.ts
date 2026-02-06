import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkapBokComponent } from './rkap-bok.component';

describe('RkapBokComponent', () => {
  let component: RkapBokComponent;
  let fixture: ComponentFixture<RkapBokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkapBokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkapBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
