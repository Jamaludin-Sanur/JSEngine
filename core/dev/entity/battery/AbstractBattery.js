
export default class AbstractBattery {

    constructor(power) {

        if (new.target === AbstractBattery) {
            throw new TypeError("Cannot construct Abstract class directly");
        }

        this._power = power;
    }

    /**
     * Reduce power
     */
    consume(power) {
        
        if(!power) return;

        this._power -= power;
        if (this._power < 0) {
            this._power = 0;
            return false;
        }
        else
            return true;
    }

    /**
     * Add power
     */
    charge(power){
        if(!power) return;
        this._power += power ? power : 0;
    }

    getPower() {
        return this._power;
    }

}