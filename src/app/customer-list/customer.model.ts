export class CustomerModel {
    latitude: string;
    longitude: string;
    name: string;
    user_id: number;
    distance: number;
    constructor(data) {
        this.latitude = data.latitude || '';
        this.longitude = data.longitude || '';
        this.name = data.name || '';
        this.user_id = data.user_id || '';
        this.distance = data.distance || '';
    }
}
