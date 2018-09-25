
import SystemListener from "../SystemListener";

export default class CollisionController extends SystemListener {

    constructor(system) {
        super(system);
    }

    // check if given position collide with other entities in the world
    willCollide(position) {
        let entities = this._system.getWorld().getEntitiesByPosition(position.x, position.y, position.z);
        for (let entity of entities) {
            if (entity.isCollide) {
                let minX = entity.getPosition().x;
                let maxX = minX + terrain.getScale().x;
                let minZ = entity.getPosition().z;
                let maxZ = minX + terrain.getScale().z;

                // Return true if position is in range
                if (position.x >= minX && position.x <= maxX && position.z >= minZ && position.z <= maxZ) {
                    return true;
                }
            };
        }
        return false;
    }

    // Propagate state if entity is collide
    onStateChange(state) {

        if (state.type == "MOVE_ENTITY") {
            let entity = this._system.getWorld().getEntity(state.owner);
            if (this.willCollide(entity.getPosition())) {
                entity.onCollision(state);
            }
        }
    }
}