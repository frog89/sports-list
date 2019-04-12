import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PlaydayTableDataSource } from './playday-table-datasource';

@Component({
  selector: 'app-playday-table',
  templateUrl: './playday-table.component.html',
  styleUrls: ['./playday-table.component.css']
})
export class PlaydayTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PlaydayTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'day'];

  ngOnInit(): void {
    this.dataSource = new PlaydayTableDataSource(this.paginator, this.sort);
  }

  ngAfterViewInit() {
    //this.dataSource = new PlaydayTableDataSource(this.paginator, this.sort);
  }
}
