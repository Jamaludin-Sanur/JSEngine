import Terrain from "../../entity/terrain/Terrain";
import SystemListener from "../SystemListener";

export default class TerrainController extends SystemListener{

    constructor(system){
        super(system);
    }

    // Check if given position is in terrain
    isInTerrain(position){
        let terrains = this._system.getWorld().getEntitiesByClass(Terrain);
        for(let terrain of terrains){
            let minX = terrain.getPosition().x;
            let maxX = minX + terrain.getScale().x;
            let minZ = terrain.getPosition().z;
            let maxZ = minX + terrain.getScale().z;

            // Return true if position is in range
            if(position.x >= minX && position.x <= maxX && position.z >= minZ && position.z <= maxZ){
                return true;
            }
        }
        return false;
    }

    // Propagate state if entity is move outside the world
    onStateChange(state){
        if (state.type == "MOVE_ENTITY") {
            let entity = this._system.getWorld().getEntity(state.owner);
            if(!this.isInTerrain(entity.getPosition())){
                entity.onVoid(state);
            }
        }
    }

}