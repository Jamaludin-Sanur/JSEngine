import SystemListener from "../SystemListener";
import MyQRobot from "../../entity/robot/MyQRobot"
import { State, StateType } from "../state/State";

/**
 * Middleware to alter custom command into engine known state
 */
export default class MyQMiddleware extends SystemListener {

    constructor(system) {
        super(system);
    }

    onStateChange(state) {

        // propagate state
        switch (state.type) {
            case "ADD_ENTITY":
                return this._reverseZ(state);
            case "MYQ_ROBOT_ROTATE_LEFT":
                return this._robotRotateLeft(state);
            case "MYQ_ROBOT_ROTATE_RIGHT":
                return this._robotRotateRight(state);
            case "MYQ_ROBOT_MOVE_FORWARD":
                return this._robotAdvance(state);
            case "MYQ_ROBOT_CLEANING":
                return state;
            default:
                return state;
        }
    }

    _reverseZ(state) {
        state.data.position.z = state.data.position.z * -1;
        return state;
    }

    _robotRotateLeft(state) {
        let world = this._system.getWorld();
        let myQRobot = world.getEntityByClass(MyQRobot);

        if (myQRobot) {

            // create new state 
            let newState = new State();
            newState.type = StateType.MOVE_ENTITY;
            newState.data.position = myQRobot.getPosition();
            newState.data.rotation = myQRobot.getRotation();
            newState.data.scale = myQRobot.getScale();
            newState.owner = myQRobot.getId();
            // set rotation
            newState.data.rotation.z += 90;
            return newState;
        }

        return state;
    }

    _robotRotateRight(state) {
        let world = this._system.getWorld();
        let myQRobot = world.getEntityByClass(MyQRobot);

        if (myQRobot) {

            // create new state 
            let newState = new State();
            newState.type = StateType.MOVE_ENTITY;
            newState.data.position = myQRobot.getPosition();
            newState.data.rotation = myQRobot.getRotation();
            newState.data.scale = myQRobot.getScale();
            newState.owner = myQRobot.getId();

            // set rotation
            newState.data.rotation.z -= 90;
            return newState;
        }

        return state;
    }

    _robotAdvance(state) {
        let world = this._system.getWorld();
        let myQRobot = world.getEntityByClass(MyQRobot);
        if (myQRobot) {

            // create new state 
            let newState = new State();
            newState.type = StateType.MOVE_ENTITY;
            newState.data.position = myQRobot.getPosition();
            newState.data.rotation = myQRobot.getRotation();
            newState.data.scale = myQRobot.getScale();
            newState.owner = myQRobot.getId();

            // set position
            switch (newState.data.rotation.z) {
                case 0:
                    newState.data.position.x += 1;
                    break;
                case 90:
                    newState.data.position.z += 1;
                    break;
                case 180:
                    newState.data.position.x -= 1;
                    break;
                case 270:
                    newState.data.position.z -= 1;
                    break;
            }

            return newState;

        }

        return state;
    }

}