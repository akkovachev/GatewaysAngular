import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IGateway } from '../models/Gateway.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-add-new-gateway',
  templateUrl: './add-new-gateway.component.html',
  styleUrls: ['./add-new-gateway.component.scss']
})
export class AddNewGatewayComponent implements OnInit {
  @ViewChild('gatewayForm') gatewayForm: NgForm;
  constructor(private dataService: DataService) { }

  error: string;

  showForm = false;

  formModel: IGateway = {
    name: '',
    IPv4Address: ''
  };

  ngOnInit(): void {}

  addNewGateway(form: NgForm) {
    let formValues = form.value;

    this.dataService.addNewGateway(formValues).then(d => {
      this.toggleShow()
    }).catch(e => {
      this.error = e.error.errors[0].msg
    })
  }

  toggleShow() {
    this.showForm = !this.showForm;
    if(this.gatewayForm) {
      this.gatewayForm.reset()
    }
    this.error = null;
  }

}
