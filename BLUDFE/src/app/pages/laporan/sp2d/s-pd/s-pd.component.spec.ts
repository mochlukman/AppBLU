import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPdComponent } from './s-pd.component';

describe('SPdComponent', () => {
  let component: SPdComponent;
  let fixture: ComponentFixture<SPdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SPdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
