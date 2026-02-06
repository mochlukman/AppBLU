import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterskpComponent } from './registerskp.component';

describe('RegisterskpComponent', () => {
  let component: RegisterskpComponent;
  let fixture: ComponentFixture<RegisterskpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterskpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterskpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
