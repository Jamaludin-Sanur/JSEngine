import System from "../system/System";
import Logger from "./Logger";
import { State, StateType } from "../system/state/State";
import MyQRobot from "../entity/robot/MyQRobot";
import Terrain from "../entity/terrain/Terrain";

export default class MyQLogger extends Logger {

    _listPosition = [];
    _listCleaning = [];

    constructor() {
        super();
    }

    log(state){
        if(state.type === "MOVE_ENTITY"){
            let robot = System.getWorld().getEntityByClass(MyQRobot);
            let pos = this._copy(robot.getPosition());
            this._listPosition.push( pos );
        }
    }

    logCleanAction(position){
        if(!position) return;
        this._listCleaning.push( this._copy(position) );
    }

    publish(options) {
        
        let robot = System.getWorld().getEntityByClass(MyQRobot);

        // get final position
        let final = {
            "X": robot.getPosition().x,
            "Y": robot.getPosition().z,
            "facing": this._getCompassDirection(robot.getRotation().z)
        }
         
        // get final battery
        let battery = robot.getBattery().getPower();
        
        // get cleaned position
        let cleaned = this._listCleaning.reverse();

        //get visited position
        let visited = this._filterListPosition();

        // print the result
        let result = { visited, cleaned, final, battery };
        console.log(result);

        if(options){
            if(options.pathOut) this.print(result, options.pathOut);
        }
    }

    print(data, path){
        try{
            const fs = require('fs');
            fs.writeFileSync(path, JSON.stringify(data, null, 4));
            console.log(`File created ${path}`)
        }catch(err){
            console.log(`There was an error creating the file result on ${path}`)
        }
    }

    _copy(obj){
        if(!obj) return null;
        try{
            let json = JSON.stringify(obj);
            return JSON.parse(json);
        }catch(e){
            return null;
        }

    }

    _isSamePosition(pos1, pos2) {
        return (pos1.x === pos2.x &&
            pos1.y === pos2.y)
    }

    _getCompassDirection(degree){
        switch(degree){
            case 0 : return "E";
            case 90 : return "N";
            case 180 : return "W";
            case 290 : return "S";
            default : return null;
        }
    }

    // filter list, removing the same position
    _filterListPosition(){
        let prevPos = null;
        let allPos = [];
        for(let pos of this._listPosition){
            pos = {
                x : pos.x,
                y : pos.z
            }
            if(!prevPos){
                allPos.push(pos);
                prevPos = pos;
            }
            if(!this._isSamePosition(prevPos, pos)){
                allPos.push(pos);
                prevPos = pos;
            }
        }
        allPos.reverse();
        allPos.shift();
        return allPos;
    }

}