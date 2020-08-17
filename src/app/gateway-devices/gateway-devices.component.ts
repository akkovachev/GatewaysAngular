import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gateway-devices',
  templateUrl: './gateway-devices.component.html',
  styleUrls: ['./gateway-devices.component.scss']
})
export class GatewayDevicesComponent implements OnInit {
  @Input() devicesMap
  @Input() gateway

  constructor() { }

  ngOnInit(): void {
  }

}
