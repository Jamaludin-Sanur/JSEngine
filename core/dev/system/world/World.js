import {State, StateType} from "../state/State";
import MyQRobot from "../../entity/robot/MyQRobot";
import Terrain from "../../entity/terrain/Terrain";
import Junk from "../../entity/etc/Junk";
import Wall from "../../entity/etc/Wall";
import SystemListener from "../SystemListener";

export default class World extends SystemListener{

    _entities = [];
    _lastId = 0;

    constructor(){
        super();
    };

    onStateChange(state){

        // Add entity
        switch(state.type){
            case StateType.ADD_ENTITY :
                this._addEntity(state);
                break;
        }
    }

    getEntity(id){
        for(let obj of this._entities){
            if( obj.getId() === id) return obj;
        }
        return null;
    }

    getEntities(){
        return this._entities;
    }

    getEntityByClass(baseClass){
        for(let obj of this._entities){
            if(obj instanceof baseClass)
                return obj;
        }
        return null;
    }

    getEntitiesByClass(baseClass){
        return this._entities.filter( entity => entity instanceof baseClass );
    }

    getEntitiesByPosition(position){
        let existingEntities = [];
        for(let entity of this._entities){
            
            let pos = entity.getPosition();
            let scale = entity.getScale();
            let lowestPoint = pos;
            let furthestPoint = {
                x : lowestPoint.x+scale.x,
                y : lowestPoint.y+scale.y,
                z : lowestPoint.z+scale.z,
            };
            if(this._isInRange(position, lowestPoint, furthestPoint)){
                existingEntities.push(entity);
            }
        }
        return existingEntities;
    }

    destroyEntity(entity){
        for(let index in this._entities){
            let existingEntity = this._entities[index];
            if(existingEntity === entity){
                this._entities.splice(index, 1);
                return entity;
            }
        }
    }

    _isInRange(posToCheck, posMinRange, posMaxRange){
        return(
            (posToCheck.x >= posMinRange.x && posToCheck.x <= posMaxRange.x) &&
            (posToCheck.y >= posMinRange.y && posToCheck.y <= posMaxRange.y) &&
            (posToCheck.z >= posMinRange.z && posToCheck.z <= posMaxRange.z)
        )
    }

    _addEntity(state){

        if(state.type !== StateType.ADD_ENTITY) throw new Error("Invalid State Type");
        
        if(!state.data.baseClass) throw new Error("Invalid Class Name");
        
        // Get the base class;
        let className = null
        switch(state.data.baseClass){
            case "MyQRobot" :
                className = MyQRobot;
                break;
            case "Terrain" :
                className = Terrain;
                break;
            case "Junk" :
                className = Junk;
                break;
            case "Wall" :
                className = Wall;
                break;
            default :
                throw new Error("unknown baseClass");
        }

        // Create entity

        let id = ++this._lastId;
        let newEntity = new className(id, state.metaData);
        newEntity.setPosition( state.data.position );
        newEntity.setRotation( state.data.rotation );
        newEntity.setScale( state.data.scale );

        // Add entity 
        this._entities.push(newEntity);

        return state;
    }

}