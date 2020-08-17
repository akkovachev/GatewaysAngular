import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Subscription, combineLatest } from 'rxjs';
import { keyBy } from 'lodash'
import { IGateway } from '../models/Gateway.model';
import { IDevice } from '../models/Device.model';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss']
})
export class GatewaysComponent implements OnInit {

  constructor(private dataService: DataService) { }

  subscriptions = new Subscription();
  gateways: IGateway[];
  devicesMap: {[key: string]: IDevice};
  devices: IDevice[];

  gatewayHeaders = [{
    value: "_id",
    label: "ID"
  },{
    value: "name",
    label: "Name"
  },{
    value: "IPv4Address",
    label: "IP V4 Address"
  },{
    value: "devices",
    label: "Devices",
    action: "arrayCount"
  },
  {
    value: "actions",
    label: "Actions",
    action: "actionButton"
  }]

  devicesHeader = [{
    value: "_id",
    label: "ID"
  },{
    value: "vendor",
    label: "Vendor"
  },{
    value: "status",
    label: "Status"
  },
  {
    value: "actions",
    label: "Actions",
    action: "actionButton"
  }]

  ngOnInit(): void {

    this.dataService.getDevices();
    this.dataService.getGateways()
    const combinedData = combineLatest(this.dataService.gatewaysSubject, this.dataService.devicesSubject)

    combinedData.subscribe(d => {
      this.gateways = d[0];
      this.devices = d[1]
      this.devicesMap = keyBy(d[1], "_id")

    })

  }

}
