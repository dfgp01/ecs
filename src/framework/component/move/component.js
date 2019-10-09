import { NewPos, NewVec } from "../../base/geometric/point";
import { PushToLink, GetLinkData, Link } from "../../base/structure/link";
import { Component } from "../../base/ecs";

/**
 * 暂时这样写
 */
class MoveComponent extends Component {
    constructor(entityId = 0, x = 0, y = 0){
        super(entityId);
        this.pos = NewPos(x, y);
        this.vec = NewVec(x, y);
    }
}

var moveComs = new Link();
function createMoveComponent(entityId = 0) {
    let com = new MoveComponent(entityId);
    PushToLink(moveComs, com);
    return com;
}

function getMoveComponent(entityId = 0) {
    let com = GetLinkData(moveComs, entityId);
    return com ? com : createMoveComponent(entityId);
}

function getMoveComponentList(){
    return moveComs;
}

export{ getMoveComponent, getMoveComponentList}