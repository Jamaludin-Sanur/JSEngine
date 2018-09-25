import {State, StateType} from "./state/State";
import Logger from "../logger/Logger";
import MyQLogger from "../logger/MyQLogger";
import World from "./world/World";
import CollisionController from "./controller/CollisionController";
import UpdateController from "./controller/UpdateController";
import TerrainController from "./controller/TerrainController";
import SystemListener from "./SystemListener";
import MyQMiddleware from "./middleware/MyQMiddleware";

class System{

    _world = null;
    _controller = [];
    _logger = new Logger();
    _stateQueue = [];
    _middlewares = [];

    constructor(){
        this.loadDefault();
    }

    setWorld(world){
        if(!(world instanceof World)) throw new Error("Invalid World");
        this._world = world;
    }

    getWorld(){
        return this._world;
    }

    addController(controller){
        if(!(controller instanceof SystemListener)) throw new Error("Invalid Controller");
        this._controller.push( controller );
    }

    addMiddleware(middleware){
        this._middlewares.push(middleware);
    }

    getControllerByClass(baseClass){
        for(let c of this._controller){
            if(c instanceof baseClass) return c;
        }
    }

    setLogger(logger){
        if(!(logger instanceof Logger)) throw new Error("Invalid Logger");
        this._logger = logger;
    }

    getLogger(){
        return this._logger;
    }

    loadDefault(){
        this.setWorld( new World(this) );
        this.addMiddleware( new MyQMiddleware(this));
        this.addController( new UpdateController(this) );
        this.addController( new CollisionController(this) );
        this.addController( new TerrainController(this) );
        this.setLogger( new MyQLogger(this) );
    }

    addState(state){
        this._stateQueue.push(state);
    }

    onStateChange(state){

        // Propagate state to middleware
        for(let middleware of this._middlewares){
            state = middleware.onStateChange(state);
        }

        // Propagate state to Controller
        for(let con of this._controller){
            con.onStateChange(state);
        }

        // Propagate state to World
        this._world.onStateChange(state);

        // Log state
        this._logger.log(state);

    }

}

export default new System();