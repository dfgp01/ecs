import { Link, PushToLink, RemoveByKeyId } from "../../../base/structure/link";
import { Collider } from "../base";

class BodyCollider extends Collider {
    constructor(entityId = 0, rect = null, tag = 0){
        super(entityId, rect, tag);
        this.line = null;
    }
}

var bodyColliderList = new Link();
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


var blockColliderList = new Link();
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