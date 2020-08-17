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
  @Input() devicesCount: number;

  constructor(private dataService: DataService) { }

  showForm = false;
  inlineErrorMessage = null;

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

  private _filter(value: string): IDevice[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.vendor.toLowerCase().indexOf(filterValue) === 0);
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.myControl.reset();
    this.inlineErrorMessage = null
  }

  displayFn(device: IDevice): string {
    return device && device.vendor ? device.vendor : '';
  }

  valueSelected(device) {
    this.deviceToAdd = device
  }

  addDeviceToGateway() {
    this.dataService.addDeviceToGateway(this.gatewayId, this.deviceToAdd._id).then(d => {
      this.toggleForm()
    }).catch(e => {
      this.inlineErrorMessage = e.error.message
    })
  }

  ngOnDestroy() {
    this.deviceSubscription.unsubscribe()
  }

}
