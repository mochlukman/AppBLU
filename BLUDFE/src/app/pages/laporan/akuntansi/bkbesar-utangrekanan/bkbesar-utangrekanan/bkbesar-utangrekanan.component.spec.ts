import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BkbesarUtangrekananComponent } from './bkbesar-utangrekanan.component';

describe('BkbesarUtangrekananComponent', () => {
  let component: BkbesarUtangrekananComponent;
  let fixture: ComponentFixture<BkbesarUtangrekananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BkbesarUtangrekananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BkbesarUtangrekananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
