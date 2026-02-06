import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokBastComponent } from './dok-bast.component';

describe('DokBastComponent', () => {
  let component: DokBastComponent;
  let fixture: ComponentFixture<DokBastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokBastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokBastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
