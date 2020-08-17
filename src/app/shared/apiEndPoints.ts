export enum ApiUrls {
  FRONTENT_API_URL = "http://localhost:3000/api",
}

/**
 * API End Points
 * @returns Object
 */
export class ApiEndPoints {

  getGateways(): string {
    return `${ApiUrls.FRONTENT_API_URL}/gateways`;
  }

  getAddGateway(): string {
    return `${ApiUrls.FRONTENT_API_URL}/gateway`;
  }

  getDeleteGateway(gatewayId) {
    return `${ApiUrls.FRONTENT_API_URL}/gateway/${gatewayId}`;
  }

  getAddDeviceToGateway() {
    return `${ApiUrls.FRONTENT_API_URL}/gateway/device/add`
  }

  getDeleteGatewayDevice(gatewayId, deviceId) {
    return `${ApiUrls.FRONTENT_API_URL}/gateway/${gatewayId}/remove/${deviceId}/device`;
  }

  getDevices(): string {
    return `${ApiUrls.FRONTENT_API_URL}/devices`;
  }

  getAddDevice(): string {
    return `${ApiUrls.FRONTENT_API_URL}/device`;
  }

  getDeleteDevice(deviceId): string {
    return `${ApiUrls.FRONTENT_API_URL}/device/${deviceId}`;
  }

 }
