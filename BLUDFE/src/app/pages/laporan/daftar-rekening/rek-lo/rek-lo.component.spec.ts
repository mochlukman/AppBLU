import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekLoComponent } from './rek-lo.component';

describe('RekLoComponent', () => {
  let component: RekLoComponent;
  let fixture: ComponentFixture<RekLoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekLoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekLoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
