import { Link, PushToLink, RemoveByKeyId } from "../base/structure/link";

class BodyCollider extends Collider {
    constructor(entityId = 0, rect = null){
        super(entityId, rect);
        //this.vec = GetVec(entityId);
        //this.pos = GetPos(entityId);
        this.line = null;
        this.formulaA = null;
        this.distance = null;
    }
}

var bodyColliderList = new Link();
function GetBodyColliderList(){
    return bodyColliderList;
}

function AddBodyCollider(entityId = 0, rect = null){
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

function AddBlockCollider(entityId = 0, rect = null){
    let c = new Collider(entityId, rect);
    PushToLink(blockColliderList, c);
    return c;
}

function RemoveBlockCollider(colliderId = 0){
    RemoveByKeyId(blockColliderList, colliderId);
}

export {GetBodyColliderList, AddBodyCollider, RemoveBodyCollider, GetBlockColliderList, AddBlockCollider, RemoveBlockCollider}