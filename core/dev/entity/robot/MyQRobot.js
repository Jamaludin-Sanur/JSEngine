import System from "../../system/System";
import AbstractRobot from "./AbstractRobot";
import TerrainController from "../../system/controller/TerrainController";
import CollisionController from "../../system/controller/CollisionController";
import StandardBattery from "../battery/StandardBattery";
import Junk from "../etc/Junk";

export default class MyQRobot extends AbstractRobot {

    // Array of backward strategy
    _strategies = [
        this.doStrategy1.bind(this),
        this.doStrategy2.bind(this),
        this.doStrategy3.bind(this),
        this.doStrategy4.bind(this),
        this.doStrategy5.bind(this),
    ];

    constructor(id, metaData) {
        super(id, metaData);

        // Create battery
        if (metaData) {
            let battery = (metaData.battery) ? new StandardBattery(metaData.battery)
                : new StandardBattery();
            this.setBattery(battery);
        }
    }

    onUpdate(state) {

        switch (state.type) {
            case "MOVE_ENTITY":
                this.rotate(state.data.rotation);
                this.move(state.data.position)
                break;
            case "MYQ_ROBOT_CLEANING": 
                this.doCleaning(state);
                break;
        }
    }

    // Triggered if collision occured
    onCollision(state) {
        this.execBackwardStrategy();
    }

    // Triggered if move outside the world
    onVoid(state) {
        this.execBackwardStrategy();
    }

    // Change robot rotation
    rotate(position) {
        // check battery
        if (this.getBattery().getPower() <= 0) return;

        this.setRotation(position);
        this.getBattery().consume(1);
    }

    // Change robot position
    move(position) {
        
        // check battery
        if (this.getBattery().getPower() <= 0) return;

        this.setPosition(position);
        this.getBattery().consume(2);
    }

    /**
     * Execute backward strategy chain
     */
    execBackwardStrategy() {
        let strategyIndex = 0;
        let currentPos = this.getPosition();
        let Terrain = System.getControllerByClass(TerrainController);
        let Collider = System.getControllerByClass(CollisionController);

        // Execute backward strategy if still collide or out of world
        while (!Terrain.isInTerrain(currentPos)
            && !Collider.willCollide(currentPos)
            && strategyIndex < this._strategies.length
        ) {
            this._strategies[strategyIndex++]();
        }
    }

    doStrategy1() {

        // correct the values following the scenario
        // the system already move this entity to the front to detect collision or onVoid
        // the problem is that action cost battery
        // so lets correct the position and the battery

        // correcting previous forward action battery
        this.getBattery().charge(2);
        // revert previous forward
        this.back();
        this.getBattery().charge(3);

        // do strategy
        this.rotateRight();
        this.advance();
    }

    doStrategy2() {
        this.rotateLeft();
        this.back();
        this.rotateRight();
        this.advance();
    }

    doStrategy3() {
        this.rotateLeft();
        this.rotateLeft();
        this.advance();
    }

    doStrategy4() {
        this.rotateRight();
        this.back();
        this.rotateRight();
        this.advance();
    }

    doStrategy5() {
        this.rotateLeft();
        this.rotateLeft();
        this.advance();
    }

    doCleaning(state) {

        // check battery
        if (this.getBattery().getPower() <= 0) return;

        const world = System.getWorld();
        const logger = System.getLogger();

        // determine if there are junk to clean
        let entities = world.getEntitiesByPosition(this.getPosition());
        for (let entity of entities) {
            if (entity instanceof Junk) {
                world.destroyEntity(entity);
                this.getBattery().consume(5);
                logger.logCleanAction(this.getPosition());
                break;
            }
        }
    }
}