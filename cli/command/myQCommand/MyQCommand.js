const ICommand = require("../ICommand");
const FS = require("fs");
const JSEngine = require("/Users/js/Documents/workspace/JSEngine/core/dist/JSEngine");
const { ListCommands, ListEntities, ListAction, ListDirection, } = require("./MyQCommandList");

class MyQCommand extends ICommand {

    constructor() {
        super();
        this._engine = new JSEngine.JsonCommands();
    }

    readJsonFile(path) {
        try {
            return JSON.parse(FS.readFileSync(path, 'utf8'));
        } catch (err) {
            console.error("\n Unable to read the file in \n");
            console.error(`${path} \n`);
        }
    }

    execCleaning(fileIn, fileOut) {
        try {
            if (!fileIn || !fileOut) {
                throw new Error("Invalid arguments");
            }
            let json = this.readJsonFile(fileIn);

            // create map
            this._createMap(json.map);

            // create robot
            this._createRobot(json);

            // create action 
            for (let com of json.commands) {
                this._createAction(ListAction[com]);
            }

            // publish log
            this._publishLog(fileOut);
        } catch (e) {
            console.log("There was an error");
        }

    }

    _createMap(map) {

        // Validate args
        if (!Array.isArray(map)) throw new Error("Map is not array 2D");
        if (map.length <= 0) throw new Error("Map is not array 2D");
        if (map.constructor !== Array) throw new Error("Map is not array 2D");

        // loop rows
        for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
            // loop cols
            let row = map[rowIndex];
            for (let colIndex = 0; colIndex < row.length; colIndex++) {

                // Create entity
                let entityCode = row[colIndex];
                let position = { x: colIndex, y: 0, z: rowIndex };
                let rotation = { x: 0, y: 0, z: 90 }; // face north
                let scale = { x: 0, y: 0, z: 0 };
                this._createEntity(entityCode, position, rotation, scale);
            }

            // create terrain
            let entityCode = ListEntities["terrain"];
            let position = { x: 0, y: 0, z: rowIndex };
            let rotation = { x: 0, y: 0, z: 90 }; // face north
            let scale = { x: row.length, y: 0, z: 0 };
            this._createEntity(entityCode, position, rotation, scale);
        }

    }

    _createEntity(entityCode, position, rotation, scale, metaData) {

        entityCode = entityCode ? entityCode.toLowerCase() : entityCode;
        let entityClass = ListEntities[entityCode];

        if (!entityClass) return;
        let json = {
            type: JSEngine.ListCommands.ADD_ENTITY,
            data: { baseClass: entityClass, position, rotation, scale },
            metaData
        }

        // Fire System listener
        this._engine.execute(JSON.stringify(json));
    }

    _createRobot(json) {
        let robotBat = json.battery;
        let robotPos = {
            x: json.start.X,
            y: 0,
            z: json.start.Y
        }
        let robotRot = ListDirection[json.start.facing.toLowerCase()]
        let robotScale = { x: 1, y: 1, z: 1 };
        let entityClass = ListEntities["myqrobot"];

        this._createEntity(entityClass, robotPos, robotRot, robotScale, { battery: robotBat });
    }

    _createAction(actionType, data, metaData) {
        let json = {
            type: JSEngine.ListCommands[actionType],
            data, metaData,
        }

        // execute
        this._engine.execute(JSON.stringify(json));
    }

    _publishLog(pathOut) {
        let json = {
            type: JSEngine.ListCommands.LOG_PUBLISH,
            metaData: { pathOut }
        }

        // execute
        this._engine.execute(JSON.stringify(json));
    }
}

module.exports = new MyQCommand();