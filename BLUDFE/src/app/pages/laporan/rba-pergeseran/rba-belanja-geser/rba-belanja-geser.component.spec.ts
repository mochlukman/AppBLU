import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbaBelanjaGeserComponent } from './rba-belanja-geser.component';

describe('RbaBelanjaGeserComponent', () => {
  let component: RbaBelanjaGeserComponent;
  let fixture: ComponentFixture<RbaBelanjaGeserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbaBelanjaGeserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbaBelanjaGeserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
