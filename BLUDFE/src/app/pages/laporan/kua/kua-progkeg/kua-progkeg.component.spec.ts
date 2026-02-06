import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KuaProgkegComponent } from './kua-progkeg.component';

describe('KuaProgkegComponent', () => {
  let component: KuaProgkegComponent;
  let fixture: ComponentFixture<KuaProgkegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KuaProgkegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KuaProgkegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
