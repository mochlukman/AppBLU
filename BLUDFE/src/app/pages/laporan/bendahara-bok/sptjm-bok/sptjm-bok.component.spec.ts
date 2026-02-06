import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SptjmBokComponent } from './sptjm-bok.component';

describe('SptjmBokComponent', () => {
  let component: SptjmBokComponent;
  let fixture: ComponentFixture<SptjmBokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SptjmBokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SptjmBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
