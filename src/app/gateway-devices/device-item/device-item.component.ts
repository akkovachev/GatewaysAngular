import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss']
})
export class DeviceItemComponent implements OnInit {
  @Input() devicesMap
  @Input() deviceId
  @Input() gatewayId

  constructor(private dataService: DataService) { }

  ngOnInit(): void { }

  remove() {
    this.dataService.removeDeviceFromGateway(this.gatewayId, this.deviceId)
  }

}
