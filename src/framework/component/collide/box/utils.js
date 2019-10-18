import { Collider } from "../base";
import { PushToLink, RemoveByKeyId, NewLink } from "../../../foundation/structure/link";

class BodyCollider extends Collider {
    constructor(entityId = 0, rect = null, tag = 0){
        super(entityId, rect, tag);
        this.line = null;
    }
}

var bodyColliderList = NewLink();
function GetBodyColliderList(){
    return bodyColliderList;
}

function AddBodyCollider(entityId = 0, rect = null, tag = 0){
    let c = new BodyCollider(entityId, rect);
    PushToLink(bodyColliderList, c);
    return c;
}

function RemoveBodyCollider(colliderId = 0){
    RemoveByKeyId(bodyColliderList, colliderId);
}


var blockColliderList = NewLink();
function GetBlockColliderList(){
    return blockColliderList;
}

function AddBlockCollider(entityId = 0, rect = null, tag = 0){
    let c = new Collider(entityId, rect, tag);
    PushToLink(blockColliderList, c);
    return c;
}

function RemoveBlockCollider(colliderId = 0){
    RemoveByKeyId(blockColliderList, colliderId);
}

export {GetBodyColliderList, AddBodyCollider, RemoveBodyCollider, GetBlockColliderList, AddBlockCollider, RemoveBlockCollider}