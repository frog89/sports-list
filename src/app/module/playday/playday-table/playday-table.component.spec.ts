import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { PlaydayTableComponent } from './playday-table.component';

describe('PlaydayTableComponent', () => {
  let component: PlaydayTableComponent;
  let fixture: ComponentFixture<PlaydayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaydayTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaydayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
