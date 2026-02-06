import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTagihanComponent } from './register-tagihan.component';

describe('RegisterTagihanComponent', () => {
  let component: RegisterTagihanComponent;
  let fixture: ComponentFixture<RegisterTagihanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTagihanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTagihanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
