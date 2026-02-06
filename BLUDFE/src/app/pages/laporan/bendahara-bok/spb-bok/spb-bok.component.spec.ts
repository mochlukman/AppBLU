import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpbBokComponent } from './spb-bok.component';

describe('SpbBokComponent', () => {
  let component: SpbBokComponent;
  let fixture: ComponentFixture<SpbBokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpbBokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpbBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
