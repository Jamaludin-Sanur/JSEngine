import Entity from "../Entity";
import StandardBattery from "../battery/StandardBattery";

export default class AbstractRobot extends Entity {

    _battery = new StandardBattery();

    constructor(id, metaData) {
        super(id, metaData);
        if (new.target === AbstractRobot) {
            throw new TypeError("Cannot construct Abstract class directly");
        }

    }

    getBattery() {
        return this._battery;
    }

    setBattery(battery) {
        this._battery = battery;
    }

    rotateLeft() {

        // check battery
        if (this.getBattery().getPower() <= 0) return;

        // set rotation
        this._battery.consume(1);
        this._rotation.z += 90;

    }

    rotateRight(state) {

        // check battery
        if (this.getBattery().getPower() <= 0) return;

        // set rotation
        this._battery.consume(1);
        this._rotation.z -= 90;
    }

    advance(state) {

        // check battery
        if (this.getBattery().getPower() <= 0) return;

        this._battery.consume(2);
        switch (this._rotation.z) {
            case 0:
                this._position.x += 1;
                break;
            case 90:
                this._position.z += 1;
                break;
            case 180:
                this._position.x -= 1;
                break;
            case 270:
                this._position.z -= 1;
                break;
        }

    }

    back() {

        // check battery
        if(this.getBattery().getPower() <= 0 ) return;

        switch (this._rotation.z) {
            case 0:
                this._position.x -= 1;
                break;
            case 90:
                this._position.z -= 1;
                break;
            case 180:
                this._position.x += 1;
                break;
            case 270:
                this._position.z += 1;
                break;
        }
        this._battery.consume(3);
    }
}