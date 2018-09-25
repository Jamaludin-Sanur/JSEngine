
export default class ICommand{

    constructor(){
        if (new.target === ICommand) {
            throw new TypeError("Cannot instantiate ICommand directly");
        }
    }

    execute(cmd){
        throw new Error("Need implemented");
    }

}