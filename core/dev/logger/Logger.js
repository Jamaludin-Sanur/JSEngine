
export default class Logger{

    _listLog = []
    _system = null;

    constructor(system){
        this._system = system;
    }

    reset(){
        this._listLog = [];
    }

    log(any){
        this._listLog.push(any);
    }

    publish(){
        for(let log of this._listLog){
            console.log(log);
        }
    }

    logError(any){
        console.error(any);
    }
}