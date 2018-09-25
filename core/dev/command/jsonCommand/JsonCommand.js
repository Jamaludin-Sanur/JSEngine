import ICommand from "../ICommand";
import System from "../../system/System";
import { State, StateType } from "../../system/state/State";
import Junk from "../../entity/etc/Junk";
import Wall from "../../entity/etc/Junk";
import Terrain from "../../entity/terrain/Terrain";

/**
 * Responsible to execute json command to engine state
 */
export default class JsonCommand extends ICommand {

    constructor() {
        super();
    }

    execute(jsonString) {

        try {
            // Validate arg
            if (!jsonString) throw new Error("Invalid command");

            // propagate command
            let state = JSON.parse(jsonString);
            switch (state.type) {
                case "LOG_PUBLISH":
                    System.getLogger().publish(state.metaData);
                    break;
                default:
                    System.onStateChange(state);
            }
        } catch (err) {
            console.error(err);
        }
    }

}