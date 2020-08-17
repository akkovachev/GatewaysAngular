import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GatewaysComponent } from './gateways/gateways.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table/data-table.component';
import { DeviceItemComponent } from './gateway-devices/device-item/device-item.component';
import { AddNewGatewayDeviceComponent } from './add-new-gateway-device/add-new-gateway-device.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { GatewayDevicesComponent } from './gateway-devices/gateway-devices.component'
import { HttpErrorInterceptor } from './shared/http-error.interceptor';
import { AddNewGatewayComponent } from './add-new-gateway/add-new-gateway.component';
import { AddNewDeviceComponent } from './add-new-device/add-new-device.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';

@NgModule({
  declarations: [
    AppComponent,
    GatewaysComponent,
    DataTableComponent,
    DeviceItemComponent,
    AddNewGatewayDeviceComponent,
    GatewayDevicesComponent,
    AddNewGatewayComponent,
    AddNewDeviceComponent,
    EmptyStateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [
  //    {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: HttpErrorInterceptor,
  //   multi: true
  // }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
