import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { IDevice } from '../models/Device.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.scss']
})
export class AddNewDeviceComponent implements OnInit {

  constructor(private dataService: DataService) { }

  error: string;

  showForm = false;

  formModel: IDevice = {
    vendor: '',
    status: ''
  };

  ngOnInit(): void {}

  addNewDevice(form: NgForm) {
    let formValues = form.value;

    this.dataService.addNewDevice(formValues).then(d => {
      form.reset();
      this.error = null;
      this.show()
    }).catch(e => {
      this.error = e.error.errors[0].msg
    })
  }

  show() {
    this.showForm = !this.showForm;
  }

}
