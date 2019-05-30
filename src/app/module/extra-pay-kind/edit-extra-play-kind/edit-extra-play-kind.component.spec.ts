import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExtraPlayKindComponent } from './edit-extra-play-kind.component';

describe('EditExtraPlayKindComponent', () => {
  let component: EditExtraPlayKindComponent;
  let fixture: ComponentFixture<EditExtraPlayKindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExtraPlayKindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExtraPlayKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
