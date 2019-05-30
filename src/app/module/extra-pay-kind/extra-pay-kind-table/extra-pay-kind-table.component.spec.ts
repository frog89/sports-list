import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraPayKindTableComponent } from './extra-pay-kind-table.component';

describe('ExtraPayKindTableComponent', () => {
  let component: ExtraPayKindTableComponent;
  let fixture: ComponentFixture<ExtraPayKindTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraPayKindTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraPayKindTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
