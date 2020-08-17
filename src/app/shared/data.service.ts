import { Injectable } from '@angular/core';
import { ApiEndPoints } from './apiEndPoints'
import { HttpClient, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { IDevice } from '../models/Device.model';
import { BehaviorSubject } from 'rxjs';
import { IGateway } from '../models/Gateway.model';
import { findIndex } from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiEndPoints = new ApiEndPoints();

  constructor(private httpClient: HttpClient) { }

  gatewaysSubject = new BehaviorSubject<IGateway[]>([]);
  devicesSubject = new BehaviorSubject<IDevice[]>([]);

  getGateways() {
    this.httpClient.get<IGateway[]>(this.apiEndPoints.getGateways()).toPromise().then(gatewaysData => {
      this.gatewaysSubject.next(gatewaysData)
    })
  }

  getDevices() {
    this.httpClient.get<IDevice[]>(this.apiEndPoints.getDevices()).toPromise().then(devicesData => {
      this.devicesSubject.next(devicesData)
    })
  }

  addDeviceToGateway(gatewayId, deviceId) {
    return this.httpClient.post<IGateway>(this.apiEndPoints.getAddDeviceToGateway(), {
      gatewayId: gatewayId,
      deviceId: deviceId
    }).toPromise().then(d => {

      let updatedGateways = [...this.gatewaysSubject.value]
      if(d) {
        let findIdx = findIndex(this.gatewaysSubject.value, (gateway) => gateway._id === d._id)
        updatedGateways[findIdx].devices = d.devices
      }

      this.gatewaysSubject.next(updatedGateways)
    })
  }

  removeDeviceFromGateway(gatewayId, deviceId) {
    this.httpClient.delete(this.apiEndPoints.getDeleteGatewayDevice(gatewayId, deviceId)).toPromise().then(d => {

      let updatedGateways = [...this.gatewaysSubject.value]
      if(d) {
        let findIdx = findIndex(this.gatewaysSubject.value, (gateway) => gateway._id === gatewayId)
        let deviceRemoveIdx = updatedGateways[findIdx].devices.indexOf(deviceId);
        if(deviceRemoveIdx !== -1) {
          updatedGateways[findIdx].devices.splice(deviceRemoveIdx, 1)

          this.gatewaysSubject.next(updatedGateways)
        } else {
          console.log('error')
          //Some error handling
        }
      }

      this.gatewaysSubject.next(updatedGateways)
    })
  }

  addNewGateway(payload) {
    return this.httpClient.post<IGateway>(this.apiEndPoints.getAddGateway(), {
      ...payload
    }).toPromise().then(d => {

      let gatewayList = [...this.gatewaysSubject.value, d]

      this.gatewaysSubject.next(gatewayList)
      return d;
    })
  }

  removeGateway(gatewayId) {
    return this.httpClient.delete(this.apiEndPoints.getDeleteGateway(gatewayId)).toPromise().then(d => {
      let currentGateways = [...this.gatewaysSubject.value]

      if(d) {
        let findIdx = findIndex(currentGateways, (gateway) => gateway._id === gatewayId)
        currentGateways.splice(findIdx, 1)
      }

      this.gatewaysSubject.next(currentGateways)
    })
  }

  addNewDevice(payload) {
    return this.httpClient.post<IDevice>(this.apiEndPoints.getAddDevice(), {
      ...payload
    }).toPromise().then(d => {

      let currentDeviceList = [...this.devicesSubject.value, d]

      this.devicesSubject.next(currentDeviceList)
      return d;
    })
  }

  removeDevice(deviceId) {
    return this.httpClient.delete(this.apiEndPoints.getDeleteDevice(deviceId)).toPromise().then(d => {
      let currentDevices = [...this.devicesSubject.value]

      if(d) {
        let findIdx = findIndex(currentDevices, (gateway) => gateway._id === deviceId)
        currentDevices.splice(findIdx, 1)
      }

      this.devicesSubject.next(currentDevices)
    })
  }

}
