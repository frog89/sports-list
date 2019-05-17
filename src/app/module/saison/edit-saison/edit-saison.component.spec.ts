import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaisonComponent } from './edit-saison.component';

describe('EditSaisonComponent', () => {
  let component: EditSaisonComponent;
  let fixture: ComponentFixture<EditSaisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSaisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
