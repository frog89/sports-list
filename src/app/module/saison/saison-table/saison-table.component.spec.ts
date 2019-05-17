import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisonTableComponent } from './saison-table.component';

describe('SaisonTableComponent', () => {
  let component: SaisonTableComponent;
  let fixture: ComponentFixture<SaisonTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisonTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
