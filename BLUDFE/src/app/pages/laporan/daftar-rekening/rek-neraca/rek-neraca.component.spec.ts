import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekNeracaComponent } from './rek-neraca.component';

describe('RekNeracaComponent', () => {
  let component: RekNeracaComponent;
  let fixture: ComponentFixture<RekNeracaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekNeracaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekNeracaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
