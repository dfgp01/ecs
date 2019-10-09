import { NewPos, NewVec } from "../../base/geometric/point";
import { PushToLink, GetLinkData, Link } from "../../base/structure/link";
import { Component } from "../../base/ecs";

/**
 * 位置组件
 */
class PosComponent extends Component {
    constructor(entityId = 0, x = 0, y = 0){
        super(entityId);
        this.pos = NewPos(x, y);
        this.vec = NewVec();
    }
}

var posComs = new Link();
function createPosComponent(entityId = 0) {
    let com = new PosComponent(entityId);
    PushToLink(posComs, com);
    return com;
}

function getPosComponent(entityId = 0) {
    let com = GetLinkData(posComs, entityId);
    return com ? com : createPosComponent(entityId);
}

function getPosComponentList(){
    return posComs;
}

export{ getPosComponent, getPosComponentList}