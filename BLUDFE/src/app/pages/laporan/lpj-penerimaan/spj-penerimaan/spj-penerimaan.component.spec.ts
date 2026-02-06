import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpjPenerimaanComponent } from './spj-penerimaan.component';

describe('SpjPenerimaanComponent', () => {
  let component: SpjPenerimaanComponent;
  let fixture: ComponentFixture<SpjPenerimaanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpjPenerimaanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpjPenerimaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
