
export default class Entity{

    _ID = null;
    _position = { x: 0, y: 0, z: 0 };
    _rotation = { x: 0, y: 0, z: 0 };
    _scale = { x: 1, y: 1, z: 1 };
    _collider = false;
    _metaData = null;

    constructor(id, metaData){
        this._ID = id;
        this._metaData = metaData;
    }

    getId(){
        return this._ID;
    }

    getPosition(){
        return this._position;
    }

    setPosition(pos){
        this._position = pos;
    }

    getRotation(){
        return this._rotation;
    }

    setRotation(rot){
        this._rotation = rot; 
    }

    getScale(){
        return this._scale;
    }

    setScale(scale){
        this._scale = scale;
    }

    setCollider(flag){
        this._collider = flag;
    }

    getCollider(){
        return this._collider;
    }

    // Trigger if state change
    onUpdate(state){

    }

    // Triggered if collision occured
    onCollision(state){
        
    }

    // Triggered if move outside the world
    onVoid(state){}
}
