export const StateType = {
    ADD_ENTITY : "ADD_ENTITY",
    MOVE_ENTITY : "MOVE_ENTITY"
}

export class State {

    type = null;
    owner = null;
    data = {
        position : { x : 0, y : 0, z : 0 },
        rotation : { x : 0, y : 0, z : 0 },
        scale : { x : 0, y : 0, z : 0 },
    };
    metadata = {};

    constructor(type, data, metadata){
        this.type = type;
        this.data = data || {};
        this.metadata = metadata || {};
    }

}