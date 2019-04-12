import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlaydayComponent } from './edit-playday.component';

describe('EditPlaydayComponent', () => {
  let component: EditPlaydayComponent;
  let fixture: ComponentFixture<EditPlaydayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlaydayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlaydayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
