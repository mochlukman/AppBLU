import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SptjComponent } from './sptj.component';

describe('SptjComponent', () => {
  let component: SptjComponent;
  let fixture: ComponentFixture<SptjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SptjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SptjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
