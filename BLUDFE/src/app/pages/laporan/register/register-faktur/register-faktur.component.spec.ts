import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFakturComponent } from './register-faktur.component';

describe('RegisterFakturComponent', () => {
  let component: RegisterFakturComponent;
  let fixture: ComponentFixture<RegisterFakturComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFakturComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFakturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
