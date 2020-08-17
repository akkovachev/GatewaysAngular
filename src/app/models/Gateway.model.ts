import { IDevice } from './Device.model';

export interface IGateway {
  _id?: string;
  name: string;
  IPv4Address: string;
  devices?: IDevice[];
  createdAt?: Date;
  updatedAt?: Date;
}
