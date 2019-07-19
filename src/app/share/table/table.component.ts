import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Output() rowClick = new EventEmitter<any>();
  @Input() data: any[];

  headers: string[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(sc: SimpleChanges) {
    if (sc.data && this.data && this.data.length > 0) {
      this.headers = Object.keys(this.data[0]);
    }
  }

  onRowClicked(row: any) {
    this.rowClick.emit(row);
  }

}
