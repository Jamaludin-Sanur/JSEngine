import SystemListener from "../SystemListener";

export default class UpdateController extends SystemListener {

    constructor(system) {
        super(system);
    }

    onStateChange(state) {

        // propagate state to all entities in the world
        let world = this._system.getWorld();
        let entities = world.getEntities();
        entities.forEach( e => { e.onUpdate(state) });

    }

}