import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaydayListComponent } from './playday-list.component';

describe('PlaydayListComponent', () => {
  let component: PlaydayListComponent;
  let fixture: ComponentFixture<PlaydayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaydayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaydayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
