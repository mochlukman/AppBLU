import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistertbpComponent } from './registertbp.component';

describe('RegistertbpComponent', () => {
  let component: RegistertbpComponent;
  let fixture: ComponentFixture<RegistertbpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistertbpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistertbpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
