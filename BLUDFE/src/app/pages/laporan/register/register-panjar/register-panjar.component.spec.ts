import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPanjarComponent } from './register-panjar.component';

describe('RegisterPanjarComponent', () => {
  let component: RegisterPanjarComponent;
  let fixture: ComponentFixture<RegisterPanjarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPanjarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPanjarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
