
export default class SystemListener{

    _system = null;

    constructor(system){
        this._system = system;
        if (new.target === SystemListener) {
            throw new TypeError("Cannot construct Abstract class directly");
        }
    }

    onStateChange(state){
        throw new Error("Need implemented");
    }

    

}