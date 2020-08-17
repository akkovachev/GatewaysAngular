import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {keyBy} from 'lodash'
import { DataService } from '../shared/data.service';
/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'data-table',
  styleUrls: ['./data-table.component.scss'],
  templateUrl: './data-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataTableComponent implements OnInit {
  @Input() data;
  @Input() deviceData;
  @Input() headers: [any];
  @Input() expandable: boolean = false;
  @Input() mode: string;

  constructor(private dataService: DataService) {}

  expandedElement: PeriodicElement | null;
  tableHeadersMap: any;
  tableValues: any[];

  ngOnInit() {
    this.tableHeadersMap = keyBy(this.headers, 'value')
    this.tableValues = this.headers.map(e => e.value)
  }

  remove(deleteId) {
    if(this.mode === 'gateway') {
      this.dataService.removeGateway(deleteId)
    } else {
      this.dataService.removeDevice(deleteId)
    }
  }

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}
