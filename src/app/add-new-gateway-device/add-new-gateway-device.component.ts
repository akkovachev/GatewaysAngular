import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataService } from '../shared/data.service';
import { IDevice } from '../models/Device.model';

@Component({
  selector: 'app-add-new-gateway-device',
  templateUrl: './add-new-gateway-device.component.html',
  styleUrls: ['./add-new-gateway-device.component.scss']
})
export class AddNewGatewayDeviceComponent implements OnInit {
  @Input() gatewayId: string;

  constructor(private dataService: DataService) { }

  showForm = false;

  myControl = new FormControl();
  options: IDevice[];
  filteredOptions: Observable<IDevice[]>;
  deviceSubscription = new Subscription();

  deviceToAdd: IDevice;

  ngOnInit(): void {

    this.deviceSubscription = this.dataService.devicesSubject.subscribe(d => {
      this.options = d;
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.vendor),
      map(value => this._filter(value))
    );
  }

  private _filter(value: IDevice): IDevice[] {
    const filterValue = value.vendor;

    return this.options.filter(option => option.vendor.indexOf(filterValue));
  }

  show() {
    this.showForm = true;
  }

  displayFn(device: IDevice): string {
    return device && device.vendor ? device.vendor : '';
  }

  valueSelected(device) {
    this.deviceToAdd = device
  }

  addDeviceToGateway() {
    this.dataService.addDeviceToGateway(this.gatewayId, this.deviceToAdd._id)
    console.log(this.gatewayId, this.deviceToAdd)
  }

  ngOnDestroy() {
    this.deviceSubscription.unsubscribe()
  }

}
