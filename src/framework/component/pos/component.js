import { NewPos, NewVec } from "../../foundation/geometric/point";
import { PushToLink, GetLinkData, NewLink, RemoveByKeyId } from "../../foundation/structure/link";
import { Component } from "../../foundation/structure/ecs";

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

var posComs = NewLink();
function createPosComponent(entityId = 0) {
    let com = new PosComponent(entityId);
    PushToLink(posComs, com);
    return com;
}

function GetPosComponent(entityId = 0) {
    let com = GetLinkData(posComs, entityId);
    return com ? com : createPosComponent(entityId);
}

function RemovePosComponent(entityId = 0){
    RemoveByKeyId(posComs, entityId);
}

export{ GetPosComponent, RemovePosComponent}