import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sp2tComponent } from './sp2t.component';

describe('Sp2tComponent', () => {
  let component: Sp2tComponent;
  let fixture: ComponentFixture<Sp2tComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sp2tComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sp2tComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
