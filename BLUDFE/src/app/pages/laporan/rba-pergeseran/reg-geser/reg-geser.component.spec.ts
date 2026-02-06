import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegGeserComponent } from './reg-geser.component';

describe('RegGeserComponent', () => {
  let component: RegGeserComponent;
  let fixture: ComponentFixture<RegGeserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegGeserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegGeserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
