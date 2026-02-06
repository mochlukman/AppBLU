import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sp2bBokComponent } from './sp2b-bok.component';

describe('Sp2bBokComponent', () => {
  let component: Sp2bBokComponent;
  let fixture: ComponentFixture<Sp2bBokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sp2bBokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sp2bBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
